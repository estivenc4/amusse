( function( $ ) {

	'use strict';

	if ( 'function' !== typeof window.vcexAnimatedText ) {
		window.vcexAnimatedText = function ( $context ) {
			if ( typeof Typed !== 'function' || 'undefined' === typeof $.fn.appear ) {
				return;
			}

			$( '.vcex-typed-text', $context ).each( function() {
				var $this     = $( this );
				var $settings = $this.data( 'settings' );
				$this.appear( function() {
					$settings.typeSpeed  = parseInt( $settings.typeSpeed );
					$settings.backDelay  = parseInt( $settings.backDelay );
					$settings.backSpeed  = parseInt( $settings.backSpeed );
					$settings.startDelay = parseInt( $settings.startDelay );
					$settings.strings    = $this.data( 'strings' );
					var typed = new Typed( this, $settings );
				} );
			} );
		};
	}

	$( document ).ready( function() {
		window.vcexAnimatedText();
	} );

} ) ( jQuery );