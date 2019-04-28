<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \Freeair_App_SDK\Constants as Constants;
// use \Freeair_App_SDK\conf\Conf as Conf;

class Generators extends CI_Controller {

    public function __construct()
    {
      parent::__construct();

      // $this->load->library(['']);

      $this->config->load('station_config', TRUE);
      $this->lang->load('station_lang');
      $this->load->model('generator_model');
    }

    public function query_start_last_log()
    {
      $station_idx = $this->input->post('station_idx');
      $gen_idx     = $this->input->post('gen_idx');
      if (!isset($station_idx) || !isset($gen_idx))
		  {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg']  = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      $last_log = $this->generator_model->get_start_last_log($gen_idx);
      if ($last_log === FALSE)
      {
        $response['code'] = Constants::GEN_GET_START_LAST_LOG_FAILED;
        $response['msg']  = $this->lang->line('GEN_GET_START_LAST_LOG_FAILED');

        echo json_encode($response);
        return ;
      }

      $response['code']       = Constants::SUCCESS;
      $response['msg']        = '';
      $response['is_running'] = $last_log->is_running;
      $response['start_time'] = $last_log->start_on * 1000;
      // $response['stop_time'] = $last_log->stop_on * 1000;
      echo json_encode($response);
    }

    public function post_start_stop_log()
    {
      $station_idx = $this->input->post('station_idx');
      $gen_idx     = $this->input->post('gen_idx');
      $is_running  = $this->input->post('is_running');
      $date_time   = $this->input->post('date_time');
      $username    = $this->input->post('username');
      $stop_cause  = $this->input->post('stop_cause');
      if (!isset($station_idx) || !isset($gen_idx) || !isset($is_running) || !isset($date_time) || !isset($username) || !isset($stop_cause))
		  {
        $response['code'] = Constants::POST_INPUT_EMPTY;
        $response['msg']  = Constants::POST_INPUT_EMPTY_MSG;

        echo json_encode($response);
        return ;
      }

      $gen_data = array(
        'is_running' => $is_running,
        'date_time'  => $date_time / 1000,
        'username'   => $username,
        'stop_cause' => $stop_cause
      );

      $res = $this->generator_model->set_start_last_log($gen_idx, $gen_data);
      if ($res === FALSE)
      {
        $response['code'] = Constants::GEN_SET_START_STOP_LOG_FAILED;
        $response['msg']  = $this->lang->line('GEN_SET_START_STOP_LOG_FAILED');

        echo json_encode($response);
        return ;
      }

      $response['code'] = Constants::SUCCESS;
      $response['msg']  = $this->lang->line('GEN_SET_START_STOP_LOG_SUCCESS');

      echo json_encode($response);
    }
}
