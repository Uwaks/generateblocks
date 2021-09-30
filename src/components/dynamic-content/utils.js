import { date } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

const getContent = ( staticContent, props ) => {
	const {
		attributes,
		dynamicData,
		dateFormat,
		userData,
	} = props;

	const {
		dynamicContentType,
		metaFieldName,
		dateType,
		dateReplacePublished,
	} = attributes;

	if ( dynamicData ) {
		if ( 'title' === dynamicContentType && dynamicData.title ) {
			return dynamicData.title.raw;
		}

		if ( 'post-date' === dynamicContentType ) {
			if ( ( 'updated' === dateType || dateReplacePublished ) && dynamicData.modified ) {
				return date( dateFormat, dynamicData.modified );
			}

			if ( 'published' === dateType && dynamicData.date ) {
				return date( dateFormat, dynamicData.date );
			}
		}

		if ( 'post-author' === dynamicContentType && userData ) {
			return userData.name;
		}

		if ( 'post-meta' === dynamicContentType ) {
			// This only works if the custom field is available in the REST API.
			return metaFieldName && dynamicData.meta[ metaFieldName ] ? dynamicData.meta[ metaFieldName ] : __( 'Post meta', 'generateblocks' );
		}

		if ( 'terms' === dynamicContentType ) {
			return __( 'List of terms', 'generateblocks' );
		}
	}

	return staticContent;
};

export {
	getContent,
};
