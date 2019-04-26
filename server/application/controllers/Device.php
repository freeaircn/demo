<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \Freeair_App_SDK\Constants as Constants;
// use \Freeair_App_SDK\conf\Conf as Conf;

// use PhpRbac\Rbac;
// use Lcobucci\JWT\Builder;
// use Lcobucci\JWT\Signer\Hmac\Sha256;
// use Lcobucci\JWT\Parser;
// use Lcobucci\JWT\ValidationData;

class Device extends CI_Controller {

    public function __construct()
    {
      parent::__construct();

      $this->config->load('be_device_config', TRUE);
      $db_group_name = $this->config->item('database_group_name', 'be_device_config');

      $this->load->database($db_group_name, TRUE, TRUE);
      // $this->load->library(['ion_auth']);
      // $this->load->library('email');
    }

    public function gen_start_last_log()
    {
      $station_idx = $this->input->post('station_idx');
      $gen_idx = $this->input->post('gen_idx');
      if (!isset($station_idx) || !isset($gen_idx))
		  {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      // $query = $this->ion_auth->identity_check($identity);
      // if ($query)
      // {
      //   $response['code'] = Constants::USERS_SIGNUP_IDENTITY_EXISTING;
      //   $response['msg'] = Constants::USERS_SIGNUP_IDENTITY_EXISTING_MSG;
      // }
      // else
      // {
      //   $response['code'] = Constants::SUCCESS;
      //   $response['msg'] = '';
      // }

      $response['code'] = Constants::SUCCESS;
      // $response['code'] = '1';
      $response['msg'] = '';
      $response['is_running'] = '0';
      $response['start_time'] = time() * 1000;
      echo json_encode($response);
    }

    public function log_gen_start_stop()
    {
      $is_running = $this->input->post('is_running');
      $date_time = $this->input->post('date_time');
      $username = $this->input->post('username');
      if (!isset($is_running) || !isset($date_time) || !isset($username))
		  {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg'] = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      // $query = $this->ion_auth->identity_check($identity);
      // if ($query)
      // {
      //   $response['code'] = Constants::USERS_SIGNUP_IDENTITY_EXISTING;
      //   $response['msg'] = Constants::USERS_SIGNUP_IDENTITY_EXISTING_MSG;
      // }
      // else
      // {
      //   $response['code'] = Constants::SUCCESS;
      //   $response['msg'] = '';
      // }

      $response['code'] = Constants::SUCCESS;
      // $response['code'] = '1';
      $response['msg'] = '成功';
      $response['in_time'] = $date_time;
      $response['out_time'] = (int)$date_time / 1000;
      echo json_encode($response);
    }
}
