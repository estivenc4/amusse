( function( $ ) {

	'use strict';

	$( document ).ready( function() {
		window.vcexHovers();
		window.vcexResponsiveCSS();
		window.vcexResponsiveText();
		window.vcexIsotopeGrids();
	} );

	$( window ).resize( function() {
		window.vcexResponsiveText();
	} );

	$( window ).on( 'orientationchange', function() {
		window.vcexIsotopeGrids();
	} );

	function elData( name, fallback ) {
		return ( typeof name !== 'undefined' ) ? name : fallback;
	}

	function viewportWidth() {
		var e = window, a = 'inner';
		if ( ! ( 'innerWidth' in window ) ) {
			a = 'client';
			e = document.documentElement || document.body;
		}
		return e[ a+'Width' ];
	}

	var isRTL = false;

	if ( 'undefined' !== typeof( wpexLocalize ) ) {
		isRTL = wpexLocalize.isRTL;
	}

	/* Responsive Text
	---------------------------------------------------------- */
	if ( 'function' !== typeof window.vcexResponsiveText ) {

		window.vcexResponsiveText = function ( $context ) {
			var self = this;
			var $responsiveText = $( '.wpex-responsive-txt' );
			$responsiveText.each( function() {
				var $this      = $( this );
				var $thisWidth = $this.width();
				var $data      = $this.data();
				var $minFont   = elData( $data.minFontSize, 13 );
				var $maxFont   = elData( $data.maxFontSize, 40 );
				var $ratio     = elData( $data.responsiveTextRatio, 10 );
				var $fontBase  = $thisWidth / $ratio;
				var $fontSize  = $fontBase > $maxFont ? $maxFont : $fontBase < $minFont ? $minFont : $fontBase;
				$this.css( 'font-size', $fontSize + 'px' );
			} );
		};

	}

	/* Hover Styles
	---------------------------------------------------------- */
	if ( 'function' !== typeof window.vcexHovers ) {
		window.vcexHovers = function ( $context ) {

			var headCSS = '';
			var cssObj  = {};

			$( '.wpex-hover-data' ).remove(); // prevent dups / front-end editor fix

			// Newer Total 4.5.4.2 method
			$( '[data-wpex-hover]' ).each( function( index, value ) {

				var $this       = $( this );
				var data        = $this.data( 'wpex-hover' );
				var uniqueClass = 'wpex-dhover-' + index;
				var hoverCSS    = '';
				var target      = '';

				if ( data.parent ) {
					$this.parents( data.parent ).addClass( uniqueClass + '-p' );
					$this.addClass( uniqueClass );
					target = '.' + uniqueClass + '-p:hover .' + uniqueClass;
				} else {
					$this.addClass( uniqueClass );
					target = '.' + uniqueClass + ':hover';
				}

				$.each( data, function( attribute, value ) {
					if ( 'target' === attribute || 'parent' === attribute ) {
						return true;
					}
					hoverCSS += attribute + ':' +  value + '!important;';
				} );

				if ( hoverCSS ) {
					if ( hoverCSS in cssObj ) {
						cssObj[hoverCSS] = cssObj[hoverCSS] + ',' + target;
					} else {
						cssObj[hoverCSS] = target;
					}
				}

			} );

			if ( cssObj ) {

				$.each( cssObj, function( css, elements ) {

					headCSS += elements + '{' + css + '}';

				} );

			}

			if ( headCSS ) {
				$( 'head' ).append( '<style class="wpex-hover-data">' + headCSS + '</style>' );
			}

		};

	}

	/* Responsive CSS
	---------------------------------------------------------- */
	if ( 'function' !== typeof window.vcexResponsiveCSS ) {
		window.vcexResponsiveCSS = function ( $context ) {

			var headCSS   = '';
			var mediaObj  = {};
			var bkPoints  = {};

			$( '.wpex-vc-rcss' ).remove(); // Prevent duplicates when editing the VC

			// Get breakpoints
			bkPoints.d = '';

			if ( 'undefined' !== typeof( wpexLocalize ) ) {
				bkPoints = $.extend( bkPoints, wpexLocalize.responsiveDataBreakpoints );
			} else {
				bkPoints = {
					'tl':'1024px',
					'tp':'959px',
					'pl':'767px',
					'pp':'479px'
				};
			}

			// Loop through breakpoints to create mediaObj
			$.each( bkPoints, function( key ) {
				mediaObj[key] = ''; // Create empty array of media breakpoints
			} );

			// loop through all modules and add CSS to mediaObj
			$( '[data-wpex-rcss]' ).each( function( index, value ) {

				var $this       = $( this );
				var uniqueClass = 'wpex-rcss-' + index;
				var data        = $this.data( 'wpex-rcss' );

				$this.addClass( uniqueClass );

				$.each( data, function( key, val ) {

					var thisVal = val;
					var target  = key;

					$.each( bkPoints, function( key ) {

						if ( thisVal[key] ) {

							mediaObj[key] += '.' + uniqueClass + '{' + target + ':' + thisVal[key] + '!important;}';

						}

					} );

				} );

			} );

			$.each( mediaObj, function( key, val ) {

				if ( 'd' == key ) {
					headCSS += val;
				} else {
					if ( val ) {
						headCSS += '@media(max-width:' + bkPoints[key] + '){' + val + '}';
					}
				}

			} );

			if ( headCSS ) {

				headCSS = '<style class="wpex-vc-rcss">' + headCSS + '</style>';

				$( 'head' ).append( headCSS );

			}

		};

	}

	/* Isotope Grids
	---------------------------------------------------------- */
	if ( 'function' !== typeof window.vcexIsotopeGrids ) {
		window.vcexIsotopeGrids = function () {

			if ( 'undefined' === typeof $.fn.imagesLoaded || 'undefined' === typeof $.fn.isotope ) {
				return;
			}

			// Standard grids
			$( '.vcex-isotope-grid' ).each( function() {

				// Isotope layout
				var $container = $( this );

				// Run only once images have been loaded
				$container.imagesLoaded( function() {

					// Check filter
					var activeItems;

					// Filter links
					var $filter = $container.prev( 'ul.vcex-filter-links' );
					if ( $filter.length ) {
						var $filterLinks = $filter.find( 'a' );
						activeItems = $container.data( 'filter' );
						if ( activeItems && ! $filter.find( '[data-filter="' + activeItems + '"]').length ) {
							activeItems = '';
						}
						$filterLinks.click( function() {
							$grid.isotope( {
								filter : $( this ).attr( 'data-filter' )
							} );
							$( this ).parents( 'ul' ).find( 'li' ).removeClass( 'active' );
							$( this ).parent( 'li' ).addClass( 'active' );
							return false;
						} );
					}

					// Crete the isotope layout
					var $grid = $container.isotope( {
						itemSelector       : '.vcex-isotope-entry',
						transformsEnabled  : true,
						isOriginLeft       : isRTL ? false : true,
						transitionDuration : $container.data( 'transition-duration' ) ? $container.data( 'transition-duration' ) + 's' : '0.4s',
						layoutMode         : $container.data( 'layout-mode' ) ? $container.data( 'layout-mode' ) : 'masonry',
						filter             : activeItems
					} );

				} );

			} );

		};

	}

} ) ( jQuery );