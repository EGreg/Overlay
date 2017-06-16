if (!window.Q) { // You can remove this part after you've run install.php
	document.getElementsByTagName('body')[0].innerHTML = "<h1>Please run Overlay/scripts/Q/install.php --all</h1>";
	throw "Q is not defined";
}

var Overlay = (function (Q, $) {
	
	// Here is some example code to get you started
	
	var Overlay = {
		userContextual: function (item) {
			var action = $(item).attr('data-action');
			if (Overlay.actions[action]) {
				Q.handle(Overlay.actions[action], Overlay, [item]);
			}
		},
		actions: {
			logout: Q.Users.logout,
			setIdentifier: Q.Users.setIdentifier
		},
		onPhotoSelect: function ($element, photo, images) {
			Overlay.selectedPhoto = photo;
			Overlay.switchToSection($('.section')[1]);
			// var src = Overlay.proxyHost + '?photoId='+photo.id
			// 	+ '&accessToken=' + FB.getAccessToken();
			var src = images[0].source;
			$('#background').attr('src', src);
			var $preview = $('#preview');
			$preview.height($preview.width() / images[0].width * images[0].height );
		},
		switchToSection: function (element) {
			$('.section').addClass('Overlay_compressed')
				.removeClass('Overlay_expandable');
			$(element).removeClass('Overlay_compressed')
				.prevAll('.section').addClass('Overlay_expandable');
		},
		postImage: function (opts) {
			var callObj = $.extend({}, {
				url: 'https://graph.facebook.com/me/photos',
				type: 'POST',
				cache: false,
				success: function(response) {
					console.log(response);
				},
				error: function() {
					console.error(arguments);
				},
				// we compose the data manually, thus
				processData: false,
				/**
				 *	Override the default send method to send the data in binary form
				 */
				xhr: function() {
					var xhr = $.ajaxSettings.xhr();
					xhr.send = function(string) {
						var bytes = Overlay.conversions.stringToBinaryArray(string);
						XMLHttpRequest.prototype.send.call(this, new Uint8Array(bytes).buffer);
					};
					return xhr;
				}
			}, opts.call);
			var boundary = 'Awesome field separator ' + Math.random();
			callObj.url += '?access_token=' + opts.fb.accessToken;
			callObj.data = Overlay.composeMultipartData(opts.fb, boundary);
			callObj.contentType = 'multipart/form-data; boundary=' + boundary;
			$.ajax(callObj);
		},
		composeMultipartData: function(fields, boundary) {
			var data = '';
			$.each(fields, function(key, value) {
				data += '--' + boundary + '\r\n';

				if (value.dataString) { // file upload
					data += 'Content-Disposition: form-data; name=\'' + key + '\'; ' +
						'filename=\'' + value.name + '\'\r\n';
					data += 'Content-Type: ' + value.type + '\r\n\r\n';
					data += value.dataString + '\r\n';
				} else {
					data += 'Content-Disposition: form-data; name=\'' + key + '\';' +
						'\r\n\r\n';
					data += value + '\r\n';
				}
			});
			data += '--' + boundary + '--';
			return data;
		},
		conversions: {
			stringToBinaryArray: function(string) {
				return Array.prototype.map.call(string, function(c) {
					return c.charCodeAt(0) & 0xff;
				});
			},
			base64ToString: function(b64String) {
				return atob(b64String);
			}
		}
	};
	
	Q.page("Overlay/welcome", function () { 
		
		Q.Users.login({
			tryQuietly: true, 
			onSuccess: {
				Overlay: function () {
					window.location = Q.url('home');
				}
			}
		});

	}, 'Overlay');
	
	Q.page("Overlay/home", function () {
		
		Q.Tool.byId('Streams_photoSelector').state.onPhotosLoaded.set(function () {
			this.$('img').tool('Q/clickable').activate();
		});
		
		var $countries = $('#countries');
		var $options = $countries.find('option');
		$options.eq(Math.floor(Math.random() * $options.length)).attr('selected', true);
		$countries.on('change', function () {
			$('#foreground').attr('src', $(this).val());
		}).trigger('change');
		
		
		$('body').on(Q.Pointer.fastclick, '.section.Overlay_expandable', true, function () {
			Overlay.switchToSection(this);
		});
		
		$('#opacity').on('change', function () {
			$('#foreground').css('opacity', $(this).val());
		});
		
		$('button').tool('Q/clickable').activate();
		
		$('#upload').on(Q.Pointer.click, function () {
			var $button = $(this);
			$button.addClass('Q_uploading');
			var canvas = $('<canvas width="525" height="525" />')
				.appendTo('body')
				.hide()[0];
			var ctx = canvas.getContext('2d');
			var $bg = $('#background');
			var $fg = $('#foreground');
			ctx.drawImage($bg[0], 
				0, 0, $bg[0].naturalWidth, $bg[0].naturalHeight, 
				0, 0, 525, 525
			);
			ctx.globalAlpha = parseFloat($('#opacity').val());
			ctx.drawImage($fg[0], 
				0, 0, $fg[0].naturalWidth, $fg[0].naturalHeight, 
				0, 0, 525, 525
			);
			ctx.globalAlpha = 1;
			
			var data = canvas.toDataURL('image/jpeg')
			.replace(/^data:image\/(png|jpe?g);base64,/, '');

			// convert the base64 string to string containing the binary data
			var image = Overlay.conversions.base64ToString(data);
			
			_postMessage("I made this with http://customizemypic.com");
			
			function _postMessage(message) {
				Overlay.postImage({
					fb: { // data to be sent to FB
						message: message,
						/* place any other API params you wish to send. Ex: place / tags etc.*/
						accessToken: FB.getAccessToken(),
						file: {
							name: 'customizemypic.jpg',
							type: 'image/jpeg', // or png
							dataString: image // the string containing the binary data
						}
					},
					call: { // options of the $.ajax call
						url: 'https://graph.facebook.com/me/photos', // or replace *me* with albumid
						success: function (response) {
							var photoId = response.id;
							location.href = "https://www.facebook.com/photo.php?fbid="
								+ photoId + "&makeprofile=1";
							// FB.ui({
							// 	method: 'share',
							// 	href: 'http://customizemypic.com'
							// }, function(response){
							// 	location.href = "https://www.facebook.com/photo.php?fbid="
							// 		+ photoId + "&makeprofile=1";
							// });
							$button.removeClass('Q_uploading');
						},
						error: function () {
							console.warn(arguments);
						}
					}
				});
			}
		});
		
	}, 'Overlay');
	
	Q.page('', function () { // all pages
		
		$('h1').tool('Q/textfill', {
			refreshOnLayout: true
		}).activate(function (slogan) {
			$(slogan).animate({opacity: 1}, 300);
		});
		
		$('.Q_clickable').tool('Q/clickable').activate();
		
		$('.Overlay_login').on(Q.Pointer.click, function () {
			Q.Users.login({
				onSuccess: {
					Overlay: function () {
						location = Q.url('home');
					}
				}
			});
			return false;
		});
		
		Q.addScript("plugins/Q/js/QTools.js", function () {
			var avatar = $('#dashboard .Users_avatar_tool');
			if (avatar.length) {
				Q.Contextual.add(avatar, $('#dashboard_user_contextual'));	
			}
		});
		
		// For example, we can hide notices when the user clicks/taps on them
		$('#notices li').on(Q.Pointer.fastclick, true, function () {
			var $this = $(this), key;
			$this.css('min-height', 0)
			.slideUp(300, function () {
				$(this).remove();
				if (!$('#notices li').length) {
					$('#notices_slot').empty();
				}
				Q.layout();
			});
			if (key = encodeURIComponent($this.attr('data-key'))) {
				Q.req('Q/notice', 'data', null, { 
					method: 'delete', 
					fields: {key: key} 
				});
			}
		}).css('cursor', 'pointer');
		
		var $iframe = $('.Q_mobile .videoArea iframe');
		var width = $iframe.parent().innerWidth();
		$iframe.css({
			width: width,
			height: width*337/600
		});
		
	}, 'Overlay');
	
	// example tool
	Q.Tool.jQuery("Fisheye", "js/fn/fisheye.js");
	Q.Tool.define("Overlay/cool", "js/tools/cool.js");

	// tell Q.handle to load pages using AJAX - much smoother
	Q.handle.options.loadUsingAjax = true;
	
	// make the app feel more native on touch devices
	Q.Pointer.preventRubberBand({
		direction: 'vertical'
	});
	Q.Pointer.startBlurringOnTouch();
	
	Q.Users.initFacebook.options.version = 'v2.5';
	
	Q.onInit.set(function () {

		// set some options
		Q.Users.login.options = Q.extend(Q.Users.login.options, {
			using: 'facebook',
			scope: ['email', 'public_profile', 'user_photos', 'publish_actions']
		});
		
		if (Q.info.isMobile) {
			Q.Tool.define.options("Q/columns", {
				back: { src: "plugins/Q/img/x.png" },
				scrollbarsAutoHide: false
			});
			Q.Tool.jQuery.options("Q/clickable", {
				press: {
					size: 1.5
				},
				release: {
					size: 3
				},
				onPress: {Groups: function (event, triggers) {
					this.parents().nextAll('.Groups_badge')
					.removeClass('Groups_show');
				}}
			});
		} else {
			Q.Tool.jQuery.options("Q/clickable", {
				press: {
					size: 0.92
				},
				release: {
					size: 1.5,
					opacity: 0.5
				},
				shadow: {
					opacity: 0.25,
					dip: 0.5
				},
				onPress: {Groups: function (event, triggers) {
					this.parents().nextAll('.Groups_badge')
					.removeClass('Groups_show');
				}}
			});
			Q.Tool.define.options("Q/columns", {
				scrollbarsAutoHide: false
			});
		}

	}, 'Overlay');
	
	return Overlay;
	
})(Q, jQuery);