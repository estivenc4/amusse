<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */


define( 'DB_NAME', 'stiven_amusse' );

/** MySQL database username */
define( 'DB_USER', 'stiven_amusse' );

/** MySQL database password */
define( 'DB_PASSWORD', 'V%X^[_d+jwW*' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '}3o zeykx-^6!HNcfJ(]=yT V7lZCu,^Nr4UWO,E_&Y#8 aWgqOrj}%|_lE-!xVE' );
define( 'SECURE_AUTH_KEY',  'gNFjw5N`#!_xlP.Q!}cHhV;q}f3=q]/^S9Fe9cw_T7C/NYUL*b($dcSqJlnJV#Jy' );
define( 'LOGGED_IN_KEY',    'SJ1-VQktX8jcr[y=:~),PGsBa42o+whWU~gaBG?@eb115:EqMgc=lVz%VpA#:}9L' );
define( 'NONCE_KEY',        '[X&!%.ou8-%mjy?~)&_nayEv4K)fL1&y|%as&1=OGu`kNfG:cX5qVCY*4s}^S4E<' );
define( 'AUTH_SALT',        '$46.QF=:Y+g=~8ka7*vtyG0&bxKw[Rcv]lV*jMP%%q!pjWKS7!.:[CpSZvriVJ,a' );
define( 'SECURE_AUTH_SALT', 'S#q1-Bs|q?jzR1PYb|b=c|D_z<b!GdG`^n0Ot I9y ifX4P9zp$X<Jf<<0z]mg.5' );
define( 'LOGGED_IN_SALT',   ' As{V21>yZXsh|ZnsdH$l#7t>qddI$tDG|xi`iUn*[d!H:TS5dsCV0IN;/lGu(xq' );
define( 'NONCE_SALT',       '@.FqHy>9;M 1+.+9W4B,!&EEWRNr,p:<fu9h6!Ru 4-qM $}$?8cC~8IdIl)<KGY' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
