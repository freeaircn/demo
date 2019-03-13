<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \Freeair_App_SDK\Constants as Constants;
use \Freeair_App_SDK\conf\Conf as Conf;

use PhpRbac\Rbac;

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

      if ($res)
      {
        $response['code'] = Constants::SUCCESS;
        $response['token'] = 'abcdefg';
      }
      else
      {
        $response['code'] = Constants::USERS_LOGIN_FAILED;
      }
      echo json_encode($response);
    }


    public function check_phone22()
    {
      $config['protocol'] = 'smtp';
      $config['smtp_host'] = 'ssl://smtp.163.com';
      $config['smtp_user'] = 'officehouqiao@163.com';
      $config['smtp_pass'] = 'HQ1101';
      $config['smtp_port'] = 465;
      $config['mailtype'] = 'html';
      $config['charset'] = 'utf-8';
      $config['validate'] = true;
      $config['priority'] = 1;
      $config['crlf'] = '\r\n';
      $config['newline'] = '\r\n';

      $this->email->initialize($config);
      $this->email->set_newline('\r\n');

      $this->email->from('officehouqiao@163.com', 'null');
      $this->email->to('freeaircn@163.com');

      $this->email->subject('Email Test');
      $this->email->message('Testing the email class.');

      echo $this->email->send(FALSE);
      echo $this->email->print_debugger(array('headers', 'subject', 'body'));

    }

    // public function handle_signup()
    // {
    //   $username = $this->input->post('username');
    //   $phone = $this->input->post('phone');
    //   $mail = $this->input->post('mail');
    //   $password = $this->input->post('password');
    //   //
    //   $gender = $this->input->post('gender');
    //   $parties = $this->input->post('parties');
    //   $company = $this->input->post('company');
    //   $deptL1 = $this->input->post('deptL1');
    //   $deptL2 = $this->input->post('deptL2');
    //   $job = $this->input->post('job');

    //   $response['state'] = Constants::AUTH_REGISTER_NEWUSER_FAILED;

    //   $user_data = array(
    //     'mail' => $mail,
    //     'gender' => $gender,
    //     'parties' => $parties,
    //     'company' => $company,
    //     'deptL1' => $deptL1,
    //     'deptL2' => $deptL2,
    //     'job' => $job,
    //   );

    //   $result = $this->fr_auth->signup($username, $phone, $password, $user_data);
    //   if ($result['state'] === Constants::AUTH_SUCCESS)
    //   {
    //     $response['state'] = Constants::AUTH_SUCCESS;
    //   }

    //   echo json_encode($response);
    // }

}
