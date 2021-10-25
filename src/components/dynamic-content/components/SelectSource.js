import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../advanced-select';
import { applyFilters } from '@wordpress/hooks';

const getOptions = () => {
	const defaultOptions = [
		{ value: 'current-post', label: __( 'Current post', 'generateblocks' ) },
		{ value: 'post-type', label: __( 'Post type', 'generateblocks' ) },
	];

	return applyFilters(
		'generateblocks.editor.dynamicContent.sourceOptions',
		defaultOptions,
	);
};

export default ( { source, onChange } ) => {
	const options = getOptions();
	const value = options.filter( ( option ) => ( option.value === source ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-source-control' }
			label={ __( 'Content source', 'generateblocks' ) }
			placeholder={ __( 'Select source', 'generateblocks' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
};
