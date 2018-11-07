<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

?>

<div class="mx-like-box" id="mx-like-button-<?php bp_activity_id(); ?>">	

	<div class="mx-like-place">

		<div class="mx-like-place-faces">
			<span class="mx-like">like</span>
			<span class="mx-heart">heart</span>
			<span class="mx-laughter">laughter</span>
			<span class="mx-wow">wow</span>
			<span class="mx-sad">sad</span>
			<span class="mx-angry">angry</span>
		</div>
		<div class="mx-like-place-count mx-display-none">0</div>

	</div>

	<button class="mx-like-main-button" data-like-type="like">
		<span>like</span>
	</button>

	<div class="mx-like-other-faces">
		<button class="mx-like-face-like" data-like-type="like">
			<span>like</span>			
		</button>
		<button class="mx-like-face-heart" data-like-type="heart">
			<span>heart</span>
		</button>
		<button class="mx-like-face-laughter" data-like-type="laughter">			
			<span>laughter</span>
		</button>
		<button class="mx-like-face-wow" data-like-type="wow">
			<span>wow</span>
		</button>
		<button class="mx-like-face-sad" data-like-type="sad">
			<span>sad</span>
		</button>
		<button class="mx-like-face-angry" data-like-type="angry">
			<span>angry</span>
		</button>
	</div>


</div>