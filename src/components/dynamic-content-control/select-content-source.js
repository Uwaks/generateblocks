import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../advanced-select';
import {applyFilters} from "@wordpress/hooks";

const getSourceOptions = () => {
	const defaultOptions = [
		{ value: 'current_post', label: __( 'Current post', 'generateblocks' ) },
		{ value: 'post_type', label: __( 'Post type', 'generateblocks' ) },
	];

	return applyFilters(
		'generateblocks.frontend.dynamicContent.sourceOptions',
		defaultOptions,
	);
};

export default ( { source, onChange } ) => {
	const options = getSourceOptions();
	const value = options.filter( ( option ) => ( option.value === source ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-source-control' }
			label={ __( 'Select content source', 'generateblocks' ) }
			placeholder={ 'Select source' }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
};
