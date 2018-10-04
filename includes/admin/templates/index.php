<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

?>

<h1><?php echo __( 'Settings Page', 'mxmlb-domain' ); ?></h1>

<div class="mx-block_wrap">

	<form id="mxmlb_form_update" class="mx-settings" method="post" action="">

		<h2>Default script</h2>
		<textarea name="mxmlb_some_string" id="mxmlb_some_string"><?php echo mxmlb_select_script(); ?></textarea>

		<p class="mx-submit_button_wrap">
			<input type="hidden" id="mxmlb_wpnonce" name="mxmlb_wpnonce" value="<?php echo wp_create_nonce( 'mxmlb_nonce_request' ) ;?>" />
			<input class="button-primary" type="submit" name="mxmlb-submit" value="Save" />
		</p>

	</form>

</div>