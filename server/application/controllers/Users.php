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
      $response['code'] = Constants::SUCCESS;
      $response['msg'] = '';

      $identity = $this->input->post('phone');
      if (!isset($identity))
		  {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;
      }
      else
      {
        $query = $this->ion_auth->identity_check($identity);
        if ($query)
        {
          $response['code'] = Constants::USERS_SIGNUP_IDENTITY_EXISTING;
          $response['msg'] = Constants::USERS_SIGNUP_IDENTITY_EXISTING_MSG;
        }
      }

      echo json_encode($response);
    }

    public function check_email()
    {
      $response['code'] = Constants::SUCCESS;
      $response['msg'] = '';

      $email = $this->input->post('email');
      if (!isset($email))
		  {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;
      }
      else
      {
        $query = $this->ion_auth->email_check($email);
        if ($query)
        {
          $response['code'] = Constants::USERS_SIGNUP_EMAIL_EXISTING;
          $response['msg'] = Constants::USERS_SIGNUP_EMAIL_EXISTING_MSG;
        }
      }

      echo json_encode($response);
    }

    public function create_user()
    {
      $phone = $this->input->post('phone');
      $email = $this->input->post('email');
      $password = $this->input->post('password');

      if (!isset($phone) || !isset($email) || !isset($password))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;
      }
      else
      {
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
          $response['msg'] = Constants::USERS_SIGNUP_USER_CREATE_FAILED_MSG;
        }
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

    public function log_user_info()
    {
      $userid = $this->input->post('userid');
      $username = $this->input->post('username');
      $gender = $this->input->post('gender');
      $parties = $this->input->post('parties');
      $company = $this->input->post('company');
      $dept_level_1 = $this->input->post('dept_level_1');
      $dept_level_2 = $this->input->post('dept_level_2');
      $job = $this->input->post('job');

      if (!isset($userid) || !isset($username) || !isset($gender) || !isset($parties) || !isset($company) || !isset($dept_level_1) || !isset($dept_level_2) || !isset($job))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;
      }
      else
      {
        $data = array(
          'username' => $username,
          'gender' => $gender,
          'party_id' => intval($parties),
          'company_id' => intval($company),
          'dept_LV1_id' => intval($dept_level_1),
          'dept_LV2_id' => intval($dept_level_2),
          'job_id' => intval($job)
           );

        $res = $this->ion_auth->update($userid, $data);
        if ($res)
        {
          $response['code'] = Constants::SUCCESS;
          $response['msg'] = '';
        }
        else
        {
          $response['code'] = Constants::USERS_SIGNUP_LOG_USER_INFO_FAILED;
          $response['msg'] = Constants::USERS_SIGNUP_LOG_USER_INFO_FAILED_MSG;
        }
      }

      echo json_encode($response);
    }

    public function login()
    {
      $userphone = $this->input->post('userphone');
      $password = $this->input->post('password');

      if (!isset($userphone) || !isset($password))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;
      }
      else
      {
        $res = $this->ion_auth->login($userphone, $password);
        if (!$res)
        {
          $response['code'] = Constants::USERS_LOGIN_FAILED;
          $response['msg'] = $this->ion_auth->errors();
        }
        else
        {
          $uid = $this->ion_auth->get_user_id_from_identity($userphone);

          $jwt_config = $this->config->item('jwt_config', 'ion_auth');
          $signer = new Sha256();
          $token = (new Builder())->setIssuer($jwt_config['issuer'])
                            ->setAudience($jwt_config['audience'])
                            ->setIssuedAt(time())
                            ->setNotBefore(time() + $jwt_config['nbf'])
                            ->setExpiration(time() + $jwt_config['exp'])
                            ->set('id', $uid)
                            ->sign($signer, $jwt_config['secret_code'])
                            ->getToken();
          $token_string = (string) $token;
          if (isset($token_string))
          {
            $response['code'] = Constants::SUCCESS;
            $response['token'] = $token_string;
          }
          else
          {
            $response['code'] = Constants::USERS_LOGIN_GEN_TOKEN_FAILED;
            $response['msg'] = Constants::USERS_LOGIN_GEN_TOKEN_FAILED_MSG;
          }
        }
      }

      echo json_encode($response);
    }

    /**
     * check token
     * @param input - token
     * @return  BOOL / id
     */
    protected function check_token($token)
    {
      if (!isset($token))
      {
        return FALSE;
      }

      $token_str = (new Parser())->parse($token);
      $signer = new Sha256();
      $jwt_config = $this->config->item('jwt_config', 'ion_auth');

      $signature = $token_str->verify($signer, $jwt_config['secret_code']);
      if (!$signature)
      {
        return FALSE;
      }
      $data = new ValidationData();
      $data->setIssuer($jwt_config['issuer']);
      $data->setAudience($jwt_config['audience']);
      $data->setCurrentTime(time());

      if (!$token_str->validate($data))
      {
        return FALSE;
      }
      return $token_str->getClaim('id');
    }

    /**
     * Get user info
     * @param input - token
     * @return
     */
    public function info()
    {
      $token = $this->input->post('token');
      // $token = (new Parser())->parse($this->input->get_request_header('X-Token', TRUE));
      if (!isset($token))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;
      }
      else
      {
        $uid = $this->check_token($token);
        if ($uid === FALSE)
        {
          $response['code'] = Constants::USERS_TOKEN_INVALID;
          $response['msg'] = Constants::USERS_TOKEN_INVALID_MSG;
        }
        else
        {
          $res = $this->ion_auth->get_user_info($uid);
          if ($res['code'] === TRUE)
          {
            $response['code'] = Constants::SUCCESS;
            $response['info'] = $res;
          }
          else
          {
            $response['code'] = Constants::USERS_GET_USER_INFO_FAILED;
            $response['msg'] = Constants::USERS_GET_USER_INFO_FAILED_MSG;
          }
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

      if (!isset($userphone) || !isset($email))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;
      }
      else
      {
        $uid = $this->ion_auth->get_user_id_from_identity($userphone);
        if ($uid === FALSE)
        {
          $response['code'] = Constants::USERS_ACTIVATE_IDENTITY_NOT_EXISTING;
          $response['msg'] = $userphone . Constants::USERS_ACTIVATE_IDENTITY_NOT_EXISTING_MSG;
        }
        else
        {
          $user = $this->ion_auth->user($uid)->row();
          $user_email = $user->email;
          if ($user->active == 1)
          {
            $response['code'] = Constants::USERS_ACTIVATE_USER_BEEN_ACTIVATED;
            $response['msg'] = $userphone . Constants::USERS_ACTIVATE_USER_BEEN_ACTIVATED_MSG;
          }
          else
          {
            if ($email != $user_email)
            {
              $reg = '/(.{1,2}).*(.{1}@.+)/';
              $str = preg_replace($reg, "$1***$2", $user_email);

              $response['code'] = Constants::USERS_ACTIVATE_INPUT_EMAIL_INVALID;
              $response['msg'] = $str . Constants::USERS_ACTIVATE_INPUT_EMAIL_INVALID_MSG;
            }
            else
            {
              // call deactivate process to generate active code in DB
              $res = $this->ion_auth_model->deactivate($uid);
              // the deactivate method call adds a message, here we need to clear that
              $this->ion_auth_model->clear_messages();
              if (!$res)
              {
                $response['code'] = Constants::USERS_ACTIVATE_GEN_CODE_FAILED;
                $response['msg'] = Constants::USERS_ACTIVATE_GEN_CODE_FAILED_MSG;
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
                  $response['msg'] = '激活邮件已发送';
                }
                else
                {
                  $response['code'] = Constants::USERS_ACTIVATE_SEND_MAIL_FAILED;
                  $response['msg'] = Constants::USERS_ACTIVATE_SEND_MAIL_FAILED_MSG;
                }
              }
            }
          }
        }
      }

      echo json_encode($response);
    }
}
