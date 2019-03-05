<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \Freeair_App_SDK\Constants as Constants;
use \Freeair_App_SDK\conf\Conf as Conf;
use PhpRbac\Rbac;

class Users extends CI_Controller {

    public function __construct()
    {
      parent::__construct();

      // $this->load->library('fr_auth');
    }

    // public function index()
    // {
    //   $this->load->view('index.html');
    // }

    public function phone()
    {
      $phone = $this->input->post('phone');

      $response['state'] = 'Got it!';
      $response['msg'] = $phone;

      $rbac = new Rbac();
      $res = $rbac->Permissions->remove(1);
      if ($res)
      {
        $response['rbac'] = 'delete success';
      }
      else
      {
        $response['rbac'] = 'delete failed';
      }
      // $response['state'] = Constants::AUTH_REGISTER_DUPLICATED_IDENTITY;

      // $result = $this->fr_auth->is_duplicated_user_phone($phone);
      // if (!$result)
      // {
      //   $response['state'] = Constants::AUTH_SUCCESS;
      // }

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
