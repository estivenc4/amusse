<?php
/**
 * Main Loop : Testimonials
 *
 * @package Total WordPress theme
 * @subpackage Partials
 * @version 5.0
 */

defined( 'ABSPATH' ) || exit;

// Increment the wpex_count var for each item in the loop
wpex_increment_loop_counter();

// Include template part
get_template_part( 'partials/testimonials/testimonials-entry' );

// Reset counter when current count equals the number of displayed columns
wpex_maybe_reset_loop_counter( wpex_get_array_first_value( wpex_testimonials_archive_columns() ) );