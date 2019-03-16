<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \Freeair_App_SDK\Constants as Constants;
// use \Freeair_App_SDK\conf\Conf as Conf;

use PhpRbac\Rbac;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;

class Users extends CI_Controller {

    public function __construct()
    {
      parent::__construct();

      $this->config->load('ion_auth', TRUE);
      $db_group_name = $this->config->item('database_group_name', 'ion_auth');

      $this->load->database($db_group_name, TRUE, TRUE);
      $this->load->library(['ion_auth']);
      $this->load->library('email');
    }

    public function check_phone()
    {
      $response['code'] = Constants::USERS_SIGNUP_IDENTITY_NOT_EXISTING;
      $identity = $this->input->post('phone');

      if (empty($identity))
		  {
			  $response['code'] = Constants::POST_INPUT_EMPTY;
      }
      else
      {
        $query = $this->ion_auth->identity_check($identity);
        if ($query)
        {
          $response['code'] = Constants::USERS_SIGNUP_IDENTITY_EXISTING;
        }
      }

      echo json_encode($response);
    }

    public function check_email()
    {
      $response['code'] = Constants::USERS_SIGNUP_EMAIL_NOT_EXISTING;
      $email = $this->input->post('email');

      if (empty($email))
		  {
			  $response['code'] = Constants::POST_INPUT_EMPTY;
      }
      else
      {
        $query = $this->ion_auth->email_check($email);
        if ($query)
        {
          $response['code'] = Constants::USERS_SIGNUP_EMAIL_EXISTING;
        }
      }

      echo json_encode($response);
    }

    public function create_user()
    {
      $phone = $this->input->post('phone');
      $email = $this->input->post('email');
      $password = $this->input->post('password');
      $identity = $phone;

      $additional_data = [
				'phone' => $phone
      ];

      $res = $this->ion_auth->register($identity, $password, $email, $additional_data);
      if ($res !== FALSE)
      {
        $response['code'] = Constants::SUCCESS;
        $response['userid'] = $res;
      }
      else
      {
        $response['code'] = Constants::USERS_SIGNUP_USER_CREATE_FAILED;
      }
      echo json_encode($response);
    }

    /**
     * Activate the user
     *
     * @param int         $id   The user ID
     * @param string|bool $code The activation code
    */
    public function activate($id, $code = FALSE)
    {
      $activation = FALSE;
      $repeat_activation = FALSE;

      $user = $this->ion_auth->user($id)->row();
      if ($user && $user->active == 0)
      {
        if ($code !== FALSE)
        {
          $activation = $this->ion_auth->activate($id, $code);
        }
      }
      if ($user && $user->active == 1)
      {
        $repeat_activation = TRUE;
      }
      // if ($code !== FALSE)
      // {
      //   $activation = $this->ion_auth->activate($id, $code);
      // }
      // else if ($this->ion_auth->is_admin())
      // {
      //   $activation = $this->ion_auth->activate($id);
      // }

      // if ($activation)
      // {
      //   $response['code'] = Constants::SUCCESS;
      // }
      // else
      // {
      //   $response['code'] = Constants::USERS_SIGNUP_USER_ACTIVATE_FAILED;
      // }
      // echo json_encode($response);

      if ($user)
      {
        $this->data['phone'] = $user->phone;
        $this->data['email'] = $user->email;
      }
      $this->data['activation'] = $activation;
      $this->data['repeat_activation'] = $repeat_activation;
      $this->load->view('activate_message', $this->data);

    }

    public function log_userinfo()
    {
      $userid = $this->input->post('userid');
      $username = $this->input->post('username');
      $gender = $this->input->post('gender');
      $parties = $this->input->post('parties');
      $company = $this->input->post('company');
      $dept_level_1 = $this->input->post('dept_level_1');
      $dept_level_2 = $this->input->post('dept_level_2');
      $job = $this->input->post('job');

      $data = array(
        'username' => $username,
        'gender' => intval($gender),
        'parties' => intval($parties),
        'company' => intval($company),
        'dept_level_1' => intval($dept_level_1),
        'dept_level_2' => intval($dept_level_2),
        'userjob' => intval($job)
         );

      $res = FALSE;
      if (!empty($userid))
      {
        $res = $this->ion_auth->update($userid, $data);
      }

      if ($res)
      {
        $response['code'] = Constants::SUCCESS;
      }
      else
      {
        $response['code'] = Constants::USERS_SIGNUP_LOG_USERINFO_FAILED;
      }
      echo json_encode($response);
    }

    public function login()
    {
      $userphone = $this->input->post('userphone');
      $password = $this->input->post('password');

      $res = $this->ion_auth->login($userphone, $password);

      if (!$res)
      {
        $response['code'] = Constants::USERS_LOGIN_FAILED;
        $response['msg'] = $this->ion_auth->errors();
      }

      $uid = $this->ion_auth->get_user_id_from_identity($userphone);

      if ($res && $uid === FALSE)
      {
        $response['code'] = Constants::USERS_LOGIN_FAILED;
        $response['msg'] = '';
      }

      if ($res && $uid !== FALSE)
      {
        $jwt_config = $this->config->item('jwt_config', 'ion_auth');

        $signer = new Sha256();
        $token_string = (string) $token = (new Builder())->setIssuer($jwt_config['issuer'])
                            ->setAudience($jwt_config['audience'])
                            ->setIssuedAt(time())
                            ->setNotBefore(time() + $jwt_config['nbf'])
                            ->setExpiration(time() + $jwt_config['exp'])
                            ->set('id', $uid)
                            ->sign($signer, $jwt_config['secret_code'])
                            ->getToken();

        $response['code'] = Constants::SUCCESS;
        $response['token'] = $token_string;
      }

      echo json_encode($response);
    }

    /**
     * Get user info
     * @param input - token
     * @return void
     */
    public function info()
    {
      $token = (new Parser())->parse($this->input->post('token'));
      $signer = new Sha256();
      $jwt_config = $this->config->item('jwt_config', 'ion_auth');

      $signature = $token->verify($signer, $jwt_config['secret_code']);
      if (!$signature)
      {
        $response['code'] = Constants::USERS_TOKEN_INVALID;
        $response['msg'] = 'TOKEN 非法';
      }
      else
      {
        $data = new ValidationData();
        $data->setIssuer($jwt_config['issuer']);
        $data->setAudience($jwt_config['audience']);
        $data->setCurrentTime(time());

        if (!$token->validate($data))
        {
          $response['code'] = Constants::USERS_TOKEN_VALIDATE_FAILED;
          $response['msg'] = 'TOKEN 校验失败';
        }
        else
        {
          $response['code'] = Constants::SUCCESS;
          $response['msg'] = $token->getClaims();
        }
      }

      echo json_encode($response);
    }
}
