import { useEntityProp } from '@wordpress/core-data';
import { dateI18n } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

export default ( postType, postId ) => {
	// We have to find a different way of doing this, currently is generating React error
	// "Rendered more hooks than during the previous render."
	// const [ siteFormat ] = useEntityProp( 'root', 'site', 'date_format' );

	const [ date ] = useEntityProp( 'postType', postType, 'date', postId );

	if ( ! date ) {
		return __( 'No date found', 'generateblocks' );
	}
	return dateI18n( 'F j, Y', date, '' );
};
