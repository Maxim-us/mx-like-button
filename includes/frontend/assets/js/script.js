;( function() {

	var mxmlb_app = {};

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

		/*
		* Show like-button system
		*/
		var setTimeoutShowLikeBox = null;

		var setTimeoutHideLikeBox = null;

		// show like buttons
		$( document ).on( 'mouseenter', '.mx-like-main-button', function() {

			var _this = $( this );

			setTimeoutShowLikeBox = setTimeout( function() {

				_this.parent().find( '.mx-like-other-faces' ).addClass( 'mx-like-other-faces-active' );

			},800 );

			clearTimeout( setTimeoutHideLikeBox );

		} );

		// hidden like buttons
		$( document ).on( 'mouseleave', '.mx-like-main-button', function() {

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
			if( $( '.activity-list' ).length ) {

				mxmlb_load_more_activity( $, '.activity-list', function() {

					$.each( mxmlb_localize.mxmlb_object_likes, function( key, value ) {

						if( $( '#' + 'mx-like-button-' + key ).length ) {

							if( !$( '#' + 'mx-like-button-' + key ).hasClass( 'mx-it-notice' ) ) {

								// set count
								var countOfLikes = Object.keys( mxmlb_localize.mxmlb_object_likes[key] ).length

								// count of likes
								mxmlb_set_count_of_likes( $, key, countOfLikes );

								// count per like
								mxmlb_count_of_likes_per_like( $, key );

								// show according faces
								mxmlb_show_like_faces( $, key );

								// to notice the post
								mxmlb_notice_the_post( $, key );

							}

						}

					} );

				} );

			} else {

				mxmlb_wait_for_Element( $, '.activity-list', function() {
				
					$.each( mxmlb_localize.mxmlb_object_likes, function( key, value ) {

						if( $( '#' + 'mx-like-button-' + key ).length ) {

							if( !$( '#' + 'mx-like-button-' + key ).hasClass( 'mx-it-notice' ) ) {
						
								// set count
								var countOfLikes = Object.keys( mxmlb_localize.mxmlb_object_likes[key] ).length

								// count of likes
								mxmlb_set_count_of_likes( $, key, countOfLikes );

								// count per like
								mxmlb_count_of_likes_per_like( $, key );

								// show according faces
								mxmlb_show_like_faces( $, key );

								// to notice the post
								mxmlb_notice_the_post( $, key );

							}	

						}

					} );

				} );

			}

			/*
			* Load page on post page
			*/
			setTimeout( function() {

				if( !$( '.activity-list' ).length ) {

					$.each( mxmlb_localize.mxmlb_object_likes, function( key, value ) {

						if( $( '#' + 'mx-like-button-' + key ).length ) {

							if( !$( '#' + 'mx-like-button-' + key ).hasClass( 'mx-it-notice' ) ) {
						
								// set count
								var countOfLikes = Object.keys( mxmlb_localize.mxmlb_object_likes[key] ).length

								// count of likes
								mxmlb_set_count_of_likes( $, key, countOfLikes );

								// count per like
								mxmlb_count_of_likes_per_like( $, key );

								// show according faces
								mxmlb_show_like_faces( $, key );

								// to notice the post
								mxmlb_notice_the_post( $, key );

							}	

						}

					} );

				}

			}, 1000 );

			// change activity stream
			$( document ).on( 'click', '.load-more, .load-newest', function() {

				mxmlb_load_more_activity( $, '.activity-list', function() {

					$.each( mxmlb_localize.mxmlb_object_likes, function( key, value ) {

						if( $( '#' + 'mx-like-button-' + key ).length ) {

							if( !$( '#' + 'mx-like-button-' + key ).hasClass( 'mx-it-notice' ) ) {

								// set count
								var countOfLikes = Object.keys( mxmlb_localize.mxmlb_object_likes[key] ).length

								// count of likes
								mxmlb_set_count_of_likes( $, key, countOfLikes );

								// count per like
								mxmlb_count_of_likes_per_like( $, key );

								// show according faces
								mxmlb_show_like_faces( $, key );

								// to notice the post
								mxmlb_notice_the_post( $, key );

							}

						}

					} );

				} );

			} );

		/*
		* click like button
		*/
		$( document ).on( 'click', '.mx-like-box', function( e ) {

			if( mxmlb_check_click_like_button( e ) === true ) {

				// like data
				var postIdFull = $( this ).attr( 'id' );

				// get post type
				var getPostType = $( this ).attr( 'data-post-type' );

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
									'typeOfLike' 	: objLike.typeOfLike,
									'postType' 		: getPostType
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
										'typeOfLike' 	: objLike.typeOfLike,
										'postType' 		: getPostType
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

								// console.log( 'delete' );

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
											'typeOfLike' 	: objLike.typeOfLike,
											'postType' 		: getPostType
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

					// count per like
					mxmlb_count_of_likes_per_like( $, postId );

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

	// set count of likes per like
	function mxmlb_count_of_likes_per_like( $, postId ) {

		var like_obj = {
			like: 		0,
			heart: 		0,
			laughter: 	0,
			wow: 		0,
			sad: 		0,
			angry: 		0
		};

		$.when(

			$.each( mxmlb_localize.mxmlb_object_likes[postId], function( key, value ) {

				var count_likes = parseInt( like_obj[value.typeOfLike] );

				like_obj[value.typeOfLike] = like_obj[value.typeOfLike] + 1

			} )

		).then( function() {

			$.each( like_obj, function( key, value ) {

				$( '#mx-like-button-' + postId ).find( '.mx-' + key ).attr( 'title', value );

			} )		

		} );		

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

	// to notice the post
	function mxmlb_notice_the_post( $, postId ) {

		$.each( mxmlb_localize.mxmlb_object_likes[postId], function( key, value ) {

			$( '#' + 'mx-like-button-' + postId ).addClass( 'mx-it-notice' );

		} );

	}

	// load element
	function mxmlb_wait_for_Element ( $, selector, callback ) {

		if ( $( selector ).length ) {

	    	callback();

		} else {

	    	setTimeout( function() {

				mxmlb_wait_for_Element( $, selector, callback );		

	    	}, 100 );    	

		}

	};

	// load more
	function mxmlb_load_more_activity( $, selector, callback ) {

		mxmlb_app.load_more_key = true;

		$( document ).on( 'DOMSubtreeModified', selector, mxmlb_change_func );

		setTimeout( function() {

			// console.log( mxmlb_app.load_more_key );

			// run observe
			if( mxmlb_app.load_more_key === false ) {

				setTimeout( function() {

					mxmlb_load_more_activity( $, selector, callback );

					// console.log( 'On' );

				}, 10 );


			} else {		

				$( selector ).off( 'DOMSubtreeModified', selector, mxmlb_change_func );

				callback();

				// console.log( 'off' );

			}

		}, 1000 );

	}

	function mxmlb_change_func() {

		mxmlb_app.load_more_key = false;

	}

	// ajax
	function mxmlb_talkig_data( data ) {

		jQuery.post( mxmlb_localize.ajaxurl, data, function( response ) {

			// console.log( response );

		} );

	}

} )();