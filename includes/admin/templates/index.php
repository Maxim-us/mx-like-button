<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

?>

<h1><?php echo __( 'Like button settings', 'mxmlb-domain' ); ?></h1>

<h2><?php echo __( 'You can change the image below.', 'mxmlb-domain' ); ?></h2>

<div class="mx-block_wrap">

	<h3><?php echo __( 'Like button', 'mxmlb-domain' ); ?></h3>

	<form enctype="multipart/form-data" action="" method="POST" class="mxmlb_form_upload_like_img">

		<input id="lb_upload_like" class="lb_upload_img" type="file" />
		<input type="submit" value="<?php echo __( 'Upload Image', 'mxmlb-domain' ); ?>" />

	</form>

</div>

<div class="mx-block_wrap">

	<h3><?php echo __( 'Heart button', 'mxmlb-domain' ); ?></h3>

	<form enctype="multipart/form-data" action="" method="POST" class="mxmlb_form_upload_like_img">

		<input id="lb_upload_heart" class="lb_upload_img" type="file" />
		<input type="submit" value="<?php echo __( 'Upload Image', 'mxmlb-domain' ); ?>" />

	</form>

</div>
