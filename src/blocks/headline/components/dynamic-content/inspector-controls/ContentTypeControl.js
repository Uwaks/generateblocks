import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../../../components/advanced-select';
import { applyFilters } from '@wordpress/hooks';

const getOptions = () => {
	const defaultOptions = [
		{ value: 'post-title', label: __( 'Post title', 'generateblocks' ) },
		{ value: 'post-excerpt', label: __( 'Post excerpt', 'generateblocks' ) },
		{ value: 'post-date', label: __( 'Post date', 'generateblocks' ) },
	];

	return applyFilters(
		'generateblocks.editor.dynamicContent.sourceTypes',
		defaultOptions,
	);
};

export default ( { contentType, onChange } ) => {
	const options = getOptions();
	const value = options.filter( ( option ) => ( option.value === contentType ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-content-type-control' }
			label={ __( 'Content type', 'generateblocks' ) }
			placeholder={ __( 'Content type', 'generateblocks' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
};
