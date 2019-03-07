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
