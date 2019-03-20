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

      if ($user)
      {
        $this->data['phone'] = $user->phone;
        $this->data['email'] = $user->email;
      }
      $this->data['activation'] = $activation;
      $this->data['repeat_activation'] = $repeat_activation;
      $this->data['base_url'] = $this->config->item('base_url');

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
     * @return
     */
    public function info()
    {
      $token = (new Parser())->parse($this->input->post('token'));
      // $token = (new Parser())->parse($this->input->get_request_header('X-Token', TRUE));

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

    public function logout()
    {
      $response['code'] = Constants::SUCCESS;

      echo json_encode($response);
    }

    /**
     * user active
     * @param userphone
     * @param email
     * @return void
     */
    public function active_mail()
    {
      $userphone = $this->input->post('userphone');
      $email = $this->input->post('email');

      $uid = $this->ion_auth->get_user_id_from_identity($userphone);

      if ($uid === FALSE)
      {
        $response['code'] = Constants::USERS_ACTIVATE_IDENTITY_NOT_EXISTING;
        $response['msg'] = $userphone . ' 用户不存在';
      }
      else
      {
        $user = $this->ion_auth->user($uid)->row();
        $user_email = $user->email;

        if ($user->active == 1)
        {
          $response['code'] = Constants::USERS_ACTIVATE_USER_BEEN_ACTIVATED;
          $response['msg'] = $userphone . ' 用户已经激活';
        }
        else
        {
          if ($email != $user_email)
          {
            $reg = '/(.{1,2}).*(.{1}@.+)/';
            $str = preg_replace($reg, "$1***$2", $user_email);

            $response['code'] = Constants::USERS_ACTIVATE_INPUT_EMAIL_INVALID;
            $response['msg'] = $userphone . ' 用户注册的邮箱(' . $str . ')与输入的邮箱不一致';
          }
          else
          {
            // call deactivate process to update user DB
            $res = $this->ion_auth_model->deactivate($uid);
            // the deactivate method call adds a message, here we need to clear that
            $this->ion_auth_model->clear_messages();

            if (!$res)
            {
              $response['code'] = Constants::USERS_ACTIVATE_GEN_CODE_FAILED;
              $response['msg'] = '服务端处理失败，请重试';
            }
            else
            {
              $activation_code = $this->ion_auth_model->activation_code;
              $identity        = $this->config->item('identity', 'ion_auth');

              $data = [
                'identity'   => $user->{$identity},
                'id'         => $user->id,
                'email'      => $email,
                'activation' => $activation_code,
                'dt'         => date("Y-m-d H:i:s")
              ];

              $message = $this->load->view($this->config->item('email_templates', 'ion_auth').$this->config->item('email_activate', 'ion_auth'), $data, true);

              $email_config = $this->config->item('email_config', 'ion_auth');

              $this->email->clear();
              $this->email->initialize($email_config);

              $this->email->from($this->config->item('admin_email', 'ion_auth'), $this->config->item('site_title', 'ion_auth'));
              $this->email->to($email);
              $this->email->subject($this->config->item('site_title', 'ion_auth') . ' - ' . $this->lang->line('email_activation_subject'));
              $this->email->message($message);

              if ($this->email->send() === TRUE)
              {
                $this->ion_auth_model->trigger_events(['post_account_creation', 'post_account_creation_successful', 'activation_email_successful']);
                $response['code'] = Constants::SUCCESS;
                $response['msg'] = '激活邮件已发送至邮箱';
              }
              else
              {
                $response['code'] = Constants::USERS_ACTIVATE_SEND_MAIL_FAILED;
                $response['msg'] = '服务端发送激活邮件失败，请重试';
              }
            }
          }
        }
      }

      echo json_encode($response);
    }
}
