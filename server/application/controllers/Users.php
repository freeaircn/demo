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
      // $db_group_name = $this->config->item('database_group_name', 'ion_auth');
      // $this->load->database($db_group_name, TRUE, TRUE);
      $this->load->library('ion_auth');
      $this->load->library('email');
    }

    public function check_phone()
    {
      $identity = $this->input->post('phone');
      if (!isset($identity))
		  {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      $query = $this->ion_auth->identity_check($identity);
      if ($query)
      {
        $response['code'] = Constants::USERS_SIGNUP_IDENTITY_EXISTING;
        $response['msg'] = Constants::USERS_SIGNUP_IDENTITY_EXISTING_MSG;
      }
      else
      {
        $response['code'] = Constants::SUCCESS;
        $response['msg'] = '';
      }
      echo json_encode($response);
    }

    // public function check_email()
    // {
    //   $email = $this->input->post('email');
    //   if (!isset($email))
		//   {
    //     $response['code'] = Constants::POST_INPUT_EMPTY;
    //     $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

    //     echo json_encode($response);
    //     return ;
    //   }

    //   $query = $this->ion_auth->email_check($email);
    //   if ($query)
    //   {
    //     $response['code'] = Constants::USERS_SIGNUP_EMAIL_EXISTING;
    //     $response['msg'] = Constants::USERS_SIGNUP_EMAIL_EXISTING_MSG;
    //   }
    //   else
    //   {
    //     $response['code'] = Constants::SUCCESS;
    //     $response['msg'] = '';
    //   }
    //   echo json_encode($response);
    // }

    /**
     * Client请求发送验证码
     *
     * @param string email, code
     * @return
    */
    public function request_code()
    {
      $email = $this->input->post('email');
      if (!isset($email))
		  {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }
      // 检查邮箱是否已被注册
      $query = $this->ion_auth->email_check($email);
      if ($query)
      {
        $response['code'] = Constants::USERS_SIGNUP_EMAIL_EXISTING;
        $response['msg'] = $email . Constants::USERS_SIGNUP_EMAIL_EXISTING_MSG;
        echo json_encode($response);
        return ;
      }

      // 生成验证码
      $code = $this->ion_auth->create_verification_code($email);
      if ($code === FALSE)
      {
        $response['code'] = Constants::USERS_SIGNUP_CREATE_VERIFICATION_FAILED;
        $response['msg'] = Constants::USERS_SIGNUP_CREATE_VERIFICATION_FAILED_MSG;
        echo json_encode($response);
        return ;
      }

      // 通过邮件发送
      $data = [
        'email'             => $email,
        'verification_code' => $code,
        'dt'                => date("Y-m-d H:i:s")
      ];

      $message = $this->load->view($this->config->item('email_templates', 'ion_auth').$this->config->item('email_verification_code', 'ion_auth'), $data, true);

      $email_config = $this->config->item('email_config', 'ion_auth');
      $this->email->clear();
      $this->email->initialize($email_config);

      $this->email->from($this->config->item('admin_email', 'ion_auth'), $this->config->item('site_title', 'ion_auth'));
      $this->email->to($email);
      $this->email->subject($this->config->item('site_title', 'ion_auth') . ' - ' . '验证码 ' . $code);
      $this->email->message($message);

      if ($this->email->send() === TRUE)
      {
        // $this->ion_auth_model->trigger_events(['post_account_creation', 'post_account_creation_successful', 'activation_email_successful']);
        $response['code'] = Constants::SUCCESS;
        $response['msg'] = '';
      }
      else
      {
        $response['code'] = Constants::USERS_ACTIVATE_SEND_MAIL_FAILED;
        $response['msg'] = Constants::USERS_ACTIVATE_SEND_MAIL_FAILED_MSG;
      }

      echo json_encode($response);
    }

    /**
     * Client请求校验验证码
     *
     * @param string email, code
     * @return bool
    */
    public function check_verification_code()
    {
      $email = $this->input->post('email');
      $code = $this->input->post('code');

      if (!isset($email) || !isset($code))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      $res = $this->ion_auth->validate_verification_code($email, $code);
      if ($res)
      {
        $response['code'] = Constants::SUCCESS;
        $response['msg'] = '';
      }
      else
      {
        $response['code'] = Constants::USERS_SIGNUP_VERIFY_VERIFICATION_FAILED;
        $response['msg'] = Constants::USERS_SIGNUP_VERIFY_VERIFICATION_FAILED_MSG;
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

        echo json_encode($response);
        return ;
      }

      $identity = $phone;
      $additional_data = [
        'phone' => $phone
      ];
      $res = $this->ion_auth->register($identity, $password, $email, $additional_data);
      if ($res !== FALSE)
      {
        $response['code'] = Constants::SUCCESS;
        $response['msg'] = '';
      }
      else
      {
        $response['code'] = Constants::USERS_SIGNUP_USER_CREATE_FAILED;
        $response['msg'] = Constants::USERS_SIGNUP_USER_CREATE_FAILED_MSG;
      }

      echo json_encode($response);
    }

    /**
     * 激活邮件中的 链接
     *
     * @param int         $id   The user ID
     * @param string|bool $code The activation code
    */
    public function activate($id, $code = FALSE)
    {
      $activation = FALSE;
      $repeat_activation = FALSE;

      $user = $this->ion_auth->user($id)->row();
      if (isset($user->active) && $user->active == 0)
      {
        if ($code !== FALSE)
        {
          $activation = $this->ion_auth->activate($id, $code);
        }
      }
      if (isset($user->active) && $user->active == 1)
      {
        $repeat_activation = TRUE;
      }

      if (isset($user->phone) && isset($user->email))
      {
        $this->data['phone'] = $user->phone;
        $this->data['email'] = $user->email;
      }
      $this->data['activation'] = $activation;
      $this->data['repeat_activation'] = $repeat_activation;
      $this->data['base_url'] = $this->config->item('base_url');

      $this->load->view('activate_message', $this->data);
    }

    public function login()
    {
      $userphone = $this->input->post('userphone');
      $password = $this->input->post('password');

      if (!isset($userphone) || !isset($password))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      $res = $this->ion_auth->login($userphone, $password);
      if (!$res)
      {
        $response['code'] = Constants::USERS_LOGIN_FAILED;
        $response['msg'] = $this->ion_auth->errors();

        echo json_encode($response);
        return ;
      }

      // $uid = $this->ion_auth->get_user_id_from_identity($userphone);
      $user = $this->ion_auth->get_user_info($userphone);

      // $jwt_config = $this->config->item('jwt_config', 'ion_auth');
      // $signer = new Sha256();
      // $token = (new Builder())->setIssuer($jwt_config['issuer'])
      //                   ->setAudience($jwt_config['audience'])
      //                   ->setIssuedAt(time())
      //                   ->setNotBefore(time() + $jwt_config['nbf'])
      //                   ->setExpiration(time() + $jwt_config['exp'])
      //                   ->set('id', $uid)
      //                   ->sign($signer, $jwt_config['secret_code'])
      //                   ->getToken();

      // TODO: 此处Token包含phone
      $token = $this->create_token($userphone);

       if ($token !== FALSE)
      {
        $response['code'] = Constants::SUCCESS;
        $response['token'] = $token;
        $response['active'] = (isset($user['active'])) ? $user['active'] : '0';
        $response['detailed_info_done'] = (isset($user['detailed_info_done'])) ? $user['detailed_info_done'] : '0';
      }
      else
      {
        $response['code'] = Constants::USERS_LOGIN_GEN_TOKEN_FAILED;
        $response['msg'] = Constants::USERS_LOGIN_GEN_TOKEN_FAILED_MSG;
      }

      echo json_encode($response);
    }

    /**
     * create token
     * @param string claim item   可以用id， phone， email等，见login处理
     * @return  bool|string
     */
    protected function create_token($item)
    {
      $jwt_config = $this->config->item('jwt_config', 'ion_auth');
      $signer = new Sha256();
      $token = (new Builder())->setIssuer($jwt_config['issuer'])
                        ->setAudience($jwt_config['audience'])
                        ->setIssuedAt(time())
                        ->setNotBefore(time() + $jwt_config['nbf'])
                        ->setExpiration(time() + $jwt_config['exp'])
                        ->set('claim_item', $item)
                        ->sign($signer, $jwt_config['secret_code'])
                        ->getToken();
      $token_string = (string) $token;

      return (isset($token_string)) ? $token_string : FALSE;
    }
    /**
     * check token
     * @param string token
     * @return  bool|int claim item 创建时，注入claim item，见login处理
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
      return $token_str->getClaim('claim_item');
    }

    /**
     * request user info
     * @param input - token
     * @return
     */
    public function request_user_info()
    {
      $token = $this->input->get_request_header('X-Token', TRUE);

      $phone = $this->check_token($token);
      if ($phone === FALSE)
      {
        $response['code'] = Constants::USERS_TOKEN_INVALID;
        $response['msg'] = Constants::USERS_TOKEN_INVALID_MSG;

        echo json_encode($response);
        return ;
      }

      $user_info = $this->ion_auth->get_user_info($phone);
      if ($user_info === FALSE)
      {
        $response['code'] = Constants::USERS_GET_USER_INFO_FAILED;
        $response['msg'] = Constants::USERS_GET_USER_INFO_FAILED_MSG;

        echo json_encode($response);
        return ;
      }

      $response = $user_info;
      $response['code'] = Constants::SUCCESS;

      echo json_encode($response);
    }

    /**
     * update user profile
     * @param input - token
     * @return
     */
    public function update_user_profile()
    {
      $token = $this->input->get_request_header('X-Token', TRUE);

      $phone = $this->check_token($token);
      if ($phone === FALSE)
      {
        $response['code'] = Constants::USERS_TOKEN_INVALID;
        $response['msg'] = Constants::USERS_TOKEN_INVALID_MSG;

        echo json_encode($response);
        return ;
      }
      $uid = $this->ion_auth->get_user_id_from_identity($phone);

      $username = $this->input->post('username');
      $gender = $this->input->post('gender');
      $political_party = $this->input->post('political_party');
      $company = $this->input->post('company');
      $subcompany = $this->input->post('subcompany');
      $station = $this->input->post('station');
      $department = $this->input->post('department');
      $job = $this->input->post('job');

      if (!isset($username) || !isset($gender) || !isset($political_party) || !isset($company) || !isset($subcompany) || !isset($station) || !isset($department) || !isset($job))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      $data = array(
        'detailed_info_done' => 1,
        'updated_on' => time(),
        //
        'username' => $username,
        'gender' => $gender,
        'political_party_id' => intval($political_party),
        'company_id' => intval($company),
        'subcompany_id' => intval($subcompany),
        'station_id' => intval($station),
        'dept_id' => intval($department),
        'job_id' => intval($job)
      );

      $res = $this->ion_auth->update($uid, $data);
      if ($res)
      {
        $response['code'] = Constants::SUCCESS;
        $response['msg'] = '用户信息已更新！';
      }
      else
      {
        $response['code'] = Constants::USERS_UPDATE_PROFILE_FAILED;
        $response['msg'] = Constants::USERS_UPDATE_PROFILE_FAILED_MSG;
      }

      echo json_encode($response);
    }

    /**
     * update password
     * @param input - token
     * @return
     */
    public function update_password()
    {
      $token = $this->input->get_request_header('X-Token', TRUE);

      $phone = $this->check_token($token);
      if ($phone === FALSE)
      {
        $response['code'] = Constants::USERS_TOKEN_INVALID;
        $response['msg'] = Constants::USERS_TOKEN_INVALID_MSG;

        echo json_encode($response);
        return ;
      }

      $old_pwd = $this->input->post('old_pwd');
      $new_pwd = $this->input->post('new_pwd');
      if (!isset($old_pwd) || !isset($new_pwd))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }
      // 验证旧密码
      if (!$this->ion_auth->verify_old_password($phone, $old_pwd))
      {
        $response['code'] = Constants::USERS_PASSWORD_OLD_INVALID;
        $response['msg'] = Constants::USERS_PASSWORD_OLD_INVALID_MSG;

        echo json_encode($response);
        return ;
      }
      // 更新密码
      if ($this->ion_auth->update_password_db($phone, $new_pwd))
      {
        $response['code'] = Constants::SUCCESS;
        $response['msg'] = '密码已更新！';
      }
      else
      {
        $response['code'] = Constants::USERS_PASSWORD_UPDATE_FAILED;
        $response['msg'] = Constants::USERS_PASSWORD_UPDATE_FAILED_MSG;
      }

      echo json_encode($response);
    }

    /**
     * update email
     * @param input - token
     * @return
     */
    public function update_email()
    {
      $token = $this->input->get_request_header('X-Token', TRUE);

      $phone = $this->check_token($token);
      if ($phone === FALSE)
      {
        $response['code'] = Constants::USERS_TOKEN_INVALID;
        $response['msg'] = Constants::USERS_TOKEN_INVALID_MSG;

        echo json_encode($response);
        return ;
      }

      $old_email = $this->input->post('old_email');
      $new_email = $this->input->post('new_email');
      $verification_code = $this->input->post('verification_code');
      if (!isset($old_email) || !isset($new_email) || !isset($verification_code))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }
      // 校验 验证码
      $res = $this->ion_auth->validate_verification_code($new_email, $verification_code);
      if (!$res)
      {
        $response['code'] = Constants::USERS_SIGNUP_VERIFY_VERIFICATION_FAILED;
        $response['msg'] = Constants::USERS_SIGNUP_VERIFY_VERIFICATION_FAILED_MSG;

        echo json_encode($response);
        return ;
      }

      // get用户
      $user = $this->ion_auth->get_user_info($phone);
      if ($user === FALSE)
      {
        $response['code'] = Constants::USERS_USER_INFO_INCORRECT;
        $response['msg'] = Constants::USERS_USER_INFO_INCORRECT_MSG;

        echo json_encode($response);
        return ;
      }
      // 核对旧email
      if ($old_email !== $user['email'])
      {
        $response['code'] = Constants::USERS_USER_INFO_INCORRECT;
        $response['msg'] = Constants::USERS_USER_INFO_INCORRECT_MSG;

        echo json_encode($response);
        return ;
      }

      // 更新email
      if ($this->ion_auth->update_email_db($phone, $new_email))
      {
        $response['code'] = Constants::SUCCESS;
        $response['msg'] = '邮箱已更新！';
      }
      else
      {
        $response['code'] = Constants::USERS_EMAIL_UPDATE_FAILED;
        $response['msg'] = Constants::USERS_EMAIL_UPDATE_FAILED_MSG;
      }

      echo json_encode($response);
    }

    /**
     * update phone
     * @param input - token
     * @return
     */
    public function update_phone()
    {
      $token = $this->input->get_request_header('X-Token', TRUE);

      $phone = $this->check_token($token);
      if ($phone === FALSE)
      {
        $response['code'] = Constants::USERS_TOKEN_INVALID;
        $response['msg'] = Constants::USERS_TOKEN_INVALID_MSG;

        echo json_encode($response);
        return ;
      }

      $new_phone = $this->input->post('new_phone');
      if (!isset($new_phone))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      // 检索新手机号 是否存在注册用户
      if ($this->ion_auth->identity_check($new_phone))
      {
        $response['code'] = Constants::USERS_SIGNUP_IDENTITY_EXISTING;
        $response['msg'] = Constants::USERS_SIGNUP_IDENTITY_EXISTING_MSG;

        echo json_encode($response);
        return ;
      }

      // 更新 phone
      if ($this->ion_auth->update_phone_db($phone, $new_phone))
      {
        $response['code'] = Constants::SUCCESS;
        $response['msg'] = '手机号已更新，请重新登录！';
      }
      else
      {
        $response['code'] = Constants::USERS_PHONE_UPDATE_FAILED;
        $response['msg'] = Constants::USERS_PHONE_UPDATE_FAILED_MSG;
      }

      echo json_encode($response);
    }


    /**
     * client request activa mail
     * @param userphone
     * @param email
     * @return void
     */
    public function request_active_mail()
    {
      $userphone = $this->input->post('userphone');
      $email = $this->input->post('email');

      if (!isset($userphone) || !isset($email))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      $uid = $this->ion_auth->get_user_id_from_identity($userphone);
      if ($uid === FALSE)
      {
        $response['code'] = Constants::USERS_ACTIVATE_IDENTITY_NOT_EXISTING;
        $response['msg'] = $userphone . Constants::USERS_ACTIVATE_IDENTITY_NOT_EXISTING_MSG;

        echo json_encode($response);
        return ;
      }

      $user = $this->ion_auth->user($uid)->row();
      $user_email = $user->email;
      if ($user->active == 1)
      {
        $response['code'] = Constants::USERS_ACTIVATE_USER_BEEN_ACTIVATED;
        $response['msg'] = $userphone . Constants::USERS_ACTIVATE_USER_BEEN_ACTIVATED_MSG;

        echo json_encode($response);
        return ;
      }

      if ($email != $user_email)
      {
        $reg = '/(.{1,2}).*(.{1}@.+)/';
        $str = preg_replace($reg, "$1***$2", $user_email);

        $response['code'] = Constants::USERS_ACTIVATE_INPUT_EMAIL_INVALID;
        $response['msg'] = Constants::USERS_ACTIVATE_INPUT_EMAIL_INVALID_MSG . $str;

        echo json_encode($response);
        return ;
      }

      // call deactivate process to generate active code in DB
      $res = $this->ion_auth_model->deactivate($uid);
      // the deactivate method call adds a message, here we need to clear that
      $this->ion_auth_model->clear_messages();
      if (!$res)
      {
        $response['code'] = Constants::USERS_ACTIVATE_GEN_CODE_FAILED;
        $response['msg'] = Constants::USERS_ACTIVATE_GEN_CODE_FAILED_MSG;

        echo json_encode($response);
        return ;
      }

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
      echo json_encode($response);
    }

    public function logout()
    {
      $response['code'] = Constants::SUCCESS;

      echo json_encode($response);
    }

    /**
     * user forgot password
     * @param userphone
     * @param email
     * @return void
     */
    public function forgot_password()
    {
      $userphone = $this->input->post('userphone');
      $email = $this->input->post('email');

      if (!isset($userphone) || !isset($email))
      {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      $uid = $this->ion_auth->get_user_id_from_identity($userphone);
      if ($uid === FALSE)
      {
        $response['code'] = Constants::USERS_PASSWORD_IDENTITY_NOT_EXISTING;
        $response['msg'] = $userphone . Constants::USERS_PASSWORD_IDENTITY_NOT_EXISTING_MSG;

        echo json_encode($response);
        return ;
      }

      $user = $this->ion_auth->user($uid)->row();
      // if ($user->active == 0)
      // {
      //   $response['code'] = Constants::USERS_ACTIVATE_USER_BEEN_ACTIVATED;
      //   $response['msg'] = $userphone . Constants::USERS_ACTIVATE_USER_BEEN_ACTIVATED_MSG;

      //   echo json_encode($response);
      //   return ;
      // }
      $user_email = $user->email;
      if ($email != $user_email)
      {
        $reg = '/(.{1,2}).*(.{1}@.+)/';
        $str = preg_replace($reg, "$1***$2", $user_email);

        $response['code'] = Constants::USERS_PASSWORD_INPUT_EMAIL_INVALID;
        $response['msg'] = Constants::USERS_PASSWORD_INPUT_EMAIL_INVALID_MSG . $str;

        echo json_encode($response);
        return ;
      }

      $code = $this->ion_auth_model->forgotten_password($user->phone);
      if ($code === FALSE)
      {
        $response['code'] = Constants::USERS_PASSWORD_GEN_CODE_FAILED;
        $response['msg'] = Constants::USERS_PASSWORD_GEN_CODE_FAILED_MSG;

        echo json_encode($response);
        return ;
      }

      $data = [
				'identity' => $user->phone,
        'hash_code' => $code,
        'dt' => date("Y-m-d H:i:s")
      ];

      $message = $this->load->view($this->config->item('email_templates', 'ion_auth') . $this->config->item('email_forgot_password', 'ion_auth'), $data, TRUE);
			$email_config = $this->config->item('email_config', 'ion_auth');
      $this->email->clear();
      $this->email->initialize($email_config);

			$this->email->from($this->config->item('admin_email', 'ion_auth'), $this->config->item('site_title', 'ion_auth'));
			$this->email->to($email);
			$this->email->subject($this->config->item('site_title', 'ion_auth') . ' - ' . $this->lang->line('email_forgotten_password_subject'));
			$this->email->message($message);

			if ($this->email->send() === TRUE)
			{
        // $this->ion_auth_model->trigger_events(['post_account_creation', 'post_account_creation_successful', 'activation_email_successful']);
        $response['code'] = Constants::SUCCESS;
        $response['msg'] = '邮件已发送';
      }
      else
      {
        $response['code'] = Constants::USERS_PASSWORD_SEND_MAIL_FAILED;
        $response['msg'] = Constants::USERS_PASSWORD_SEND_MAIL_FAILED_MSG;
      }

      echo json_encode($response);
    }

    /**
     * user reset password
     * @param hash_code
     * @param password
     * @return void
     */
    public function reset_password()
    {
      $hash_code = $this->input->post('hash_code');
      $password = $this->input->post('password');

      if (!isset($hash_code) || !isset($password))
      {
        $response['hash_code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      // 输入检查，hash code中间是否有.
      $reg = '/\./';
      if (preg_match($reg, $hash_code) === 0)
      {
        $response['hash_code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      $user = $this->ion_auth->forgotten_password_check($hash_code);
      if ($user === FALSE)
      {
        $response['code'] = Constants::USERS_PASSWORD_RESET_INVALID;
        $response['msg'] = Constants::USERS_PASSWORD_RESET_INVALID_MSG;

        echo json_encode($response);
        return ;
      }

      $identity = $user->{$this->config->item('identity', 'ion_auth')};
      // $identity = '13';

			// do we have a valid request?
      // TODO: csrf

			// finally change the password
			$change = $this->ion_auth->reset_password($identity, $password);

			if ($change)
			{
				$response['code'] = Constants::SUCCESS;
        $response['msg'] = '新密码设置成功';
			}
			else
			{
				$response['code'] = Constants::USERS_PASSWORD_RESET_FAILED;
        $response['msg'] = Constants::USERS_PASSWORD_RESET_FAILED_MSG;
			}

      echo json_encode($response);
    }

}
