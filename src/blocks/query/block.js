/**
 * Internal dependencies
 */
import metadata from './block.json';
import Edit from './edit';

import {
	InnerBlocks,
} from '@wordpress/block-editor';

import {
	registerBlockType,
} from '@wordpress/blocks';

registerBlockType( metadata, {
	edit: Edit,
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
} );
