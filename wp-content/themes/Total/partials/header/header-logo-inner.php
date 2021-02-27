<?php
/**
 * Displays the header logo.
 *
 * @package Total WordPress Theme
 * @subpackage Partials
 * @version 5.0.8
 */

defined( 'ABSPATH' ) || exit;

// Define output.
$output = '';

// Define variables.
$logo_url   = wpex_header_logo_url();
$logo_img   = wpex_header_logo_img();
$logo_title = wpex_header_logo_title();

// Get custom overlay logo if enabled on a per-post basis.
if ( wpex_has_post_meta( 'wpex_overlay_header' ) && wpex_has_overlay_header() ) {
	$overlay_logo = wpex_overlay_header_logo_img();
}

// Display image logo.
if ( ! empty( $logo_img ) || ! empty( $overlay_logo ) ) {

	// Define logo image attributes.
	$img_attrs = apply_filters( 'wpex_header_logo_img_attrs', array(
		'src'            => esc_url( $logo_img ),
		'alt'            => esc_attr( $logo_title ),
		'class'          => wpex_header_logo_img_class(),
		'width'          => intval( wpex_header_logo_img_width() ),
		'height'         => intval( wpex_header_logo_img_height() ),
		'data-no-retina' => '',
		'data-skip-lazy' => '',
	) );

	// Custom header-overlay logo.
	// @todo update to have new wpex_header_logo_link_class() so we don't have to write dup html here.
	if ( ! empty( $overlay_logo ) ) {

		$img_attrs['src'] = esc_url( $overlay_logo );

		$output .= '<a id="site-logo-link" href="' . esc_url( $logo_url ) . '" rel="home" class="overlay-header-logo">';

			$output .= '<img ' . wpex_parse_attrs( $img_attrs ) . ' />';

		$output .= '</a>';

	}

	// Standard site-wide image logo.
	elseif ( ! empty( $logo_img ) ) {

		$output .= '<a id="site-logo-link" href="' . esc_url( $logo_url ) . '" rel="home" class="main-logo">';

			$output .= '<img ' . wpex_parse_attrs( $img_attrs ) . ' />';

		$output .= '</a>';

	}

}

// Display text logo.
else {

	$logo_icon = wpex_header_logo_icon();

	$output .= '<a id="site-logo-link" href="' . esc_url( $logo_url ) . '" rel="home" class="' . esc_attr( wpex_header_logo_txt_class() ) . '">';

		if ( $logo_icon ) {
			$output .= $logo_icon;
		}

		$output .= esc_html( $logo_title );

	$output .= '</a>';

}

// Apply filters and display logo.
echo apply_filters( 'wpex_header_logo_output', $output );