<?php
/**
 * Name:    device Model
 * Author:  freeair
 *
 * Created:  2019.04.28
 *
 * Description:
 *
 * Requirements: PHP5.6 or above
 *
 * @package
 * @author
 * @link
 * @filesource
 */
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Device Model
 * @property
 */
class Be_device_model extends CI_Model
{
	/**
	 * Holds an array of tables used
	 *
	 * @var array
	 */
	public $tables = [];

	/**
	 * Database object
	 *
	 * @var object
	 */
	protected $db;

	public function __construct()
	{
		$this->config->load('Be_device_config', TRUE);

		// initialize the database
		$group_name = $this->config->item('database_group_name', 'Be_device_config');
		if (empty($group_name))
		{
			// By default, use CI's db that should be already loaded
			$CI =& get_instance();
			$this->db = $CI->db;
		}
		else
		{
			// For specific group name, open a new specific connection
			$this->db = $this->load->database($group_name, TRUE, TRUE);
		}

		// initialize db tables data
		$this->tables = $this->config->item('tables', 'Be_device_config');
	}

	/**
	 * Getter to the DB connection used by Ion Auth
	 * May prove useful for debugging
	 *
	 * @return object
	 */
	public function db()
	{
		return $this->db;
	}

  /**
	 * Get Gen start lsst log
	 *
	 * @param int|null $gen_idx
	 * @return bool
	 * @author freeair
	 */
	public function get_gen_start_last_log($gen_idx = '')
	{
		// $this->trigger_events('');

    if (empty($gen_idx))
		{
			return FALSE;
    }

    $gen_table = '';
    switch ($gen_idx)
    {
      case '1':
        $gen_table = $this->tables['g1_start_stop_log'];
        break;
      case '2':
        $gen_table = $this->tables['g2_start_stop_log'];
        break;
      case '3':
        $gen_table = $this->tables['g3_start_stop_log'];
        break;
      default:
        return FALSE;
    }

    // select * from table order by id DESC limit 1
    $query = $this->db->select('*')
						  ->order_by('id', 'DESC')
						  ->limit(1)
						  ->get($gen_table);
		if ($query->num_rows() !== 1)
		{
			return FALSE;
		}

		return $query->row();
  }

  /**
	 * set Gen start lsst log
   * @param array|null $gen_data
	 *
	 * @param int|null $gen_idx
	 * @return bool|array
	 * @author freeair
	 */
	public function set_gen_start_last_log($gen_idx = '', $gen_data = array())
	{
		// $this->trigger_events('');

    if (empty($gen_idx) || empty($gen_data))
		{
			return FALSE;
    }

    $gen_table = '';
    switch ($gen_idx)
    {
      case '1':
        $gen_table = $this->tables['g1_start_stop_log'];
        break;
      case '2':
        $gen_table = $this->tables['g2_start_stop_log'];
        break;
      case '3':
        $gen_table = $this->tables['g3_start_stop_log'];
        break;
      default:
        return FALSE;
    }

    $start_data = array();
    $stop_data = array();
    if ($gen_data['is_running'] === '0')
    {
      $start_data = array(
        'is_running'    => 1,
        'start_on'      => $gen_data['date_time'],
        'start_recoder' => $gen_data['username'],
        'update_on'     => time()
      );
    }
    else if ($gen_data['is_running'] === '1')
    {
      $stop_data = array(
        'is_running'    => 0,
        'stop_on'       => $gen_data['date_time'],
        'stop_recoder'  => $gen_data['username'],
        'stop_cause'    => $gen_data['stop_cause'],
        'update_on'     => time()
      );
    }
    // insert 开机事件
    if (!empty($start_data) && empty($stop_data))
    {
      $res = $this->db->insert($gen_table, $start_data);
      return $res;
    }
    // 停机事件
    if (empty($start_data) && !empty($stop_data))
    {
      $query = $this->db->select('id')
						  ->order_by('id', 'DESC')
						  ->limit(1)
              ->get($gen_table);
      if ($query->num_rows() !== 1)
      {
        return FALSE;
      }
      $res = $this->db->update($gen_table, $stop_data, array('id' => $query->row()->id));
      return $res;
    }
  }
}
