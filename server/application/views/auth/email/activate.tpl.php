<html>
<body>
	<h1><?php echo sprintf(lang('email_activate_heading'), $identity);?></h1>
	<p><?php echo sprintf(lang('email_activate_subheading'), anchor('users/activate/'. $id .'/'. $activation, lang('email_activate_link')));?></p>
  <p><?php echo '发送时间： ' . $dt;?></p>
</body>
</html>
