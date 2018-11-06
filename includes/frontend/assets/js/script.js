jQuery( document ).ready( function( $ ){

	/*
	* mxmlb_object_likes - the object of data
	*/

	if( mxmlb_localize.mxmlb_object_likes === '0' ) {

		mxmlb_localize.mxmlb_object_likes = {
			0: {
				0: {
					'typeOfLike': 'like'
				}
			}
		};

	}
	
	// mxmlb_localize.mxmlb_object_likes = {
	// 	42: {
	// 		2: {
	// 			'typeOfLike': 'like'
	// 		},
	// 		4: {
	// 			'typeOfLike': 'wow'
	// 		},
	// 		3: {
	// 			'typeOfLike': 'wow'
	// 		}
			
	// 	},
	// 	41: {
	// 		3: {
	// 			'typeOfLike': 'sad'
	// 		},
	// 		2: {
	// 			'typeOfLike': 'wow'
	// 		}
			
	// 	},
	// 	25: {
	// 		3: {
	// 			'typeOfLike': 'sad'
	// 		}			
	// 	},
	// 	46: {
	// 		2: {
	// 			'typeOfLike': 'like'
	// 		},
	// 		1: {
	// 			'typeOfLike': 'wow'
	// 		},
	// 		3: {
	// 			'typeOfLike': 'wow'
	// 		}
			
	// 	},
		
	// };

	/*
	* Show like-button system
	*/
	var setTimeoutShowLikeBox = null;

	var setTimeoutHideLikeBox = null;

	// show like buttons
	$( '#activity-stream' ).on( 'mouseenter', '.mx-like-main-button', function() {

		var _this = $( this );

		setTimeoutShowLikeBox = setTimeout( function() {

			_this.parent().find( '.mx-like-other-faces' ).addClass( 'mx-like-other-faces-active' );

		},800 );

		clearTimeout( setTimeoutHideLikeBox );

	} );

	// hidden like buttons
	$( '#activity-stream' ).on( 'mouseleave', '.mx-like-main-button', function() {

		var _this = $( this );

		setTimeoutHideLikeBox = setTimeout( function() {

			_this.parent().find( '.mx-like-other-faces' ).removeClass( 'mx-like-other-faces-active' );

		},800 );

		clearTimeout( setTimeoutShowLikeBox );

	} );

	/*
	* reading the like object and set the like data
	*/
		// loading page
		mxmlb_wait_for_Element( $, '.activity-list', function() {
			
			
			$.each( mxmlb_localize.mxmlb_object_likes, function( key, value ) {

				// set count
				var countOfLikes = Object.keys( mxmlb_localize.mxmlb_object_likes[key] ).length

				// count of likes
				mxmlb_set_count_of_likes( $, key, countOfLikes );

				// show according faces
				mxmlb_show_like_faces( $, key );

			} );					

		} );
		

		// change activity stream
		// $( '.activity-list' ).on( 'DOMSubtreeModified', function() {

		// 	$.each( mxmlb_localize.mxmlb_object_likes, function( key, value ) {

		// 		// set count
		// 		var countOfLikes = Object.keys( mxmlb_localize.mxmlb_object_likes[key] ).length

		// 		mxmlb_set_count_of_likes( $, key, countOfLikes );

		// 		alert( 'change' );

		// 	} );

		// } );

	/*
	* click like button
	*/
	$( '#activity-stream' ).on( 'click', '.mx-like-box', function( e ) {

		if( mxmlb_check_click_like_button( e ) === true ) {

			// like data
			var postIdFull = $( this ).attr( 'id' );

			postId = parseInt( postIdFull.slice( 15 ) );

			// get type of like
			var objLike = {};

			var userId = parseInt( mxmlb_localize.mxmlb_current_user_data.id );

			var typeOfLike = $( mxmlb_find_click_like_button( e ) ).data().likeType;

			objLike.typeOfLike = typeOfLike;

			/*
			* check like|dislike
			*/
			var newPostId = 0;

			$.when( 

				// check new post id
				$.each( mxmlb_localize.mxmlb_object_likes, function( key, value ) {

					var _postId = parseInt( key );

					// find post id
					if( _postId === postId ) {

						newPostId = _postId;

					}
					
				} )

			 ).then( function() {

			 	// if need 'CREATE' new like obj
			 	if( newPostId === 0 ) {

			 		// save like data in object
			 		mxmlb_localize.mxmlb_object_likes[postId] = {};
					mxmlb_localize.mxmlb_object_likes[postId][userId] = objLike;

					// save data
					var data = {

						'action': 'mxmlb_mounting_like_obj',
						'nonce': mxmlb_localize.mxmlb_nonce,
						'mxmlb_object_likes': {
							'post_id' 	: postId,
							'user_ids'	: {
								'id' 			: userId,
								'typeOfLike' 	: objLike.typeOfLike
							}
						}

					};

					mxmlb_talkig_data( data );

				// if need 'UPDATE' new like obj
			 	} else {

					// save type of like if user id not exists
					if( mxmlb_localize.mxmlb_object_likes[newPostId][userId] === undefined ) {

						mxmlb_localize.mxmlb_object_likes[newPostId][userId] = objLike;

						// save data datastore
						var data = {

							'action': 'mxmlb_mounting_like_obj',
							'nonce': mxmlb_localize.mxmlb_nonce,
							'mxmlb_object_likes': {
								'post_id' 	: newPostId,
								'user_ids'	: {
									'id' 			: userId,
									'typeOfLike' 	: objLike.typeOfLike
								}
							}

						};

						mxmlb_talkig_data( data );

						// show face
						mxmlb_show_like_faces( $, newPostId );
					
					// update type of like if user id exists
					} else{

						// cancel like if user click main button again						
						if( $( mxmlb_find_click_like_button( e ) ).hasClass( 'mx-like-main-button' ) ) {

							delete mxmlb_localize.mxmlb_object_likes[newPostId][userId];

							// delete from database
							var data = {

								'action': 'mxmlb_delete_like_obj',
								'nonce': mxmlb_localize.mxmlb_nonce,
								'mxmlb_object_likes': {
									'post_id' 	: newPostId,
									'user_ids'	: {
										'id' 			: userId,
										'typeOfLike' 	: 'del'
									}
								}

							};

							mxmlb_talkig_data( data );

							console.log( 'delete' );

						// or update like object
						} else {

							mxmlb_localize.mxmlb_object_likes[newPostId][userId] = objLike;


							// update database
							var data = {

								'action': 'mxmlb_mounting_like_obj',
								'nonce': mxmlb_localize.mxmlb_nonce,
								'mxmlb_object_likes': {
									'post_id' 	: newPostId,
									'user_ids'	: {
										'id' 			: userId,
										'typeOfLike' 	: objLike.typeOfLike
									}
								}

							};

							mxmlb_talkig_data( data );

							// show face
							mxmlb_show_like_faces( $, newPostId );

						}

					}					

			 	}			 	
				
				/*
				* get object for particular post and set count, type of likes
				*/
				var countObjects = Object.keys( mxmlb_localize.mxmlb_object_likes[postId] ).length;

				// count function
				mxmlb_set_count_of_likes( $, postId, countObjects );

				// show faces function
				mxmlb_show_like_faces( $, postId );

				/*
				* get the list of like types 
				*/
				// console.log( mxmlb_localize.mxmlb_object_likes );

			} );

		}

	} );

} );

// check button
function mxmlb_check_click_like_button( e ) {	

	var _nodeName = e.target.nodeName;

	_nodeName = _nodeName.toLowerCase();

	var parentElementNodeName = e.target.parentElement.nodeName;

	parentElementNodeName = parentElementNodeName.toLowerCase();

	if( _nodeName === 'button' || parentElementNodeName === 'button' ) {

		return true;

	}

}

// find button
function mxmlb_find_click_like_button( e ) {

	var _nodeName = e.target.nodeName;

	_nodeName = _nodeName.toLowerCase();

	var parentElementNodeName = e.target.parentElement.nodeName;

	parentElementNodeName = parentElementNodeName.toLowerCase();

	if( _nodeName === 'button' ) {

		return e.target;

	}

	if( parentElementNodeName === 'button' ) {

		return e.target.parentElement;

	}

}

// set count of likes
function mxmlb_set_count_of_likes( $, postId, countObj ) {

	// check 0 number
	if( countObj > 0 ) {

		// activation counter
		$( '#' + 'mx-like-button-' + postId ).find( '.mx-like-place-count' ).removeClass( 'mx-display-none' );

	} else {

		// hide counter
		$( '#' + 'mx-like-button-' + postId ).find( '.mx-like-place-count' ).addClass( 'mx-display-none' );

	}	

	// set number
	$( '#' + 'mx-like-button-' + postId ).find( '.mx-like-place-count' ).text( countObj );

}

// show like faces
function mxmlb_show_like_faces( $, postId ) {

	// clear the face table
	$( '#' + 'mx-like-button-' + postId + ' .mx-like-place-faces' )
	.find( 'span' ).removeClass( 'mx-like-active' );

	$.each( mxmlb_localize.mxmlb_object_likes[postId], function( key, value ) {

		$( '#' + 'mx-like-button-' + postId + ' .mx-like-place-faces' )
		.find( '.mx-' + value.typeOfLike ).addClass( 'mx-like-active' );

	} );

}

// load element
function mxmlb_wait_for_Element ($, selector, callback) {

  if ( $( selector ).length ) {

    callback();

  } else {

    setTimeout( function() {

      mxmlb_wait_for_Element( $, selector, callback );

    }, 100 );

  }

};

// ajax
function mxmlb_talkig_data( data ) {

	jQuery.post( mxmlb_localize.ajaxurl, data, function( response ) {

		console.log( response );

	} );

}
