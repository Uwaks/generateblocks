import metadata from './block.json';
import HeadlineEdit from '../headline/edit';
import headlineAttributes from '../headline/attributes';
import withUniqueId from '../../hoc/withUniqueId';

import { registerBlockType } from '@wordpress/blocks';
import { useEntityProp } from '@wordpress/core-data';

// Change our icon attribute to a string so it's saved in our attributes.
const attributes = Object.assign( {}, headlineAttributes, {
	icon: {
		type: 'string',
		default: '',
	},
} );

function EditDynamicHeadline( props ) {
	const {
		attributes,
		context: { postType, postId },
	} = props;

	const [ rawTitle = '' ] = useEntityProp(
		'postType',
		postType,
		'title',
		postId
	);

	const newAttributes = Object.assign( {}, attributes, { content: rawTitle } );

	return ( <HeadlineEdit { ...props } attributes={ newAttributes } renderContent={ true } /> );
};

registerBlockType( metadata, {
	attributes,
	edit: withUniqueId( EditDynamicHeadline ),
} );
