<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

?>

<div class="mx-like-box" id="mx-like-button-<?php bp_activity_id(); ?>">	

	<div class="mx-like-place">

		<div class="mx-like-place-faces">
			<span class="mx-like mx-like-hide">like</span>
			<span class="mx-heart mx-like-hide">heart</span>
			<span class="mx-laughter mx-like-hide">laughter</span>
			<span class="mx-wow mx-like-hide">wow</span>
			<span class="mx-sad mx-like-hide">sad</span>
			<span class="mx-angry mx-like-hide">angry</span>
		</div>
		<div class="mx-like-place-count">10</div>

	</div>

	<button class="mx-like-main-button" data-like-type="like">
		<i class="fa fa-thumbs-o-up"></i>
	</button>

	<div class="mx-like-other-faces">
		<button class="mx-like-face-like" data-like-type="like">
			<!-- <i class="fa fa-thumbs-o-up"></i> -->
			like
		</button>
		<button class="mx-like-face-heart" data-like-type="heart">
			<!-- <i class="fa fa-heart-o"></i> -->
			heart
		</button>
		<button class="mx-like-face-laughter" data-like-type="laughter">
			<!-- <i class="fa fa-smile-o"></i> -->
			laughter
		</button>
		<button class="mx-like-face-wow" data-like-type="wow">
			<!-- <i class="fa fa-thumbs-o-up"></i> -->
			wow
		</button>
		<button class="mx-like-face-sad" data-like-type="sad">
			<!-- <i class="fa fa-thumbs-o-up"></i> -->
			sad
		</button>
		<button class="mx-like-face-angry" data-like-type="angry">
			<!-- <i class="fa fa-thumbs-o-up"></i> -->
			angry
		</button>
	</div>


</div>