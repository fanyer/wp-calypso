/**
 * External dependencies
 */
import { SyncHandler } from './sync-handler';
import debugFactory from 'debug';
const debug = debugFactory( 'calypso:wp' );

/**
 * Internal dependencies
 */
import wpcomUndocumented from 'lib/wpcom-undocumented';
import config from 'config';
import wpcomSupport from 'lib/wp/support';

let wpcom;

if ( config.isEnabled( 'oauth' ) ) {
	const oauthToken = require( 'lib/oauth-token' );
	const requestHandler = config.isEnabled( 'sync-handler' )
		? new SyncHandler( require( 'lib/wpcom-xhr-wrapper' ) )
		: require( 'lib/wpcom-xhr-wrapper' );

	wpcom = wpcomUndocumented( oauthToken.getToken(), requestHandler );
} else {
	const requestHandler = config.isEnabled( 'sync-handler' )
		? new SyncHandler( require( 'wpcom-proxy-request' ) )
		: require( 'lib/wpcom-xhr-wrapper' );

	wpcom = wpcomUndocumented( requestHandler );

	// Upgrade to "access all users blogs" mode
	wpcom.request( {
		metaAPI: { accessAllUsersBlogs: true }
	}, function( error ) {
		if ( error ) {
			throw error;
		}
		debug( 'Proxy now running in "access all user\'s blogs" mode' );
	} );
}

/**
 * Expose `wpcom`
 */
if ( config.isEnabled( 'support-user' ) ) {
	module.exports = wpcomSupport( wpcom );
} else {
	module.exports = wpcom;
}
