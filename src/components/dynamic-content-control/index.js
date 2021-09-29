import PanelArea from '../panel-area';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import dynamicContentAttributes from './dynamic-content-attributes';
import SelectContentSource from './select-content-source';

export {
	dynamicContentAttributes,
};

export default ( { attributes, setAttributes } ) => {
	const { hasDynamicContent, dynamicSource } = attributes;

	return (
		<PanelArea
			title={ __( 'Dynamic Content', 'generateblocks' ) }
			id={ 'dynamicContent' }
			showPanel={ true }
		>
			<div style={ { marginTop: '12px', marginBottom: '24px' } }>
				<ToggleControl
					label={ __( 'Enable dynamic content', 'generateblocks' ) }
					checked={ hasDynamicContent }
					onChange={ ( hasDynamicContent ) => setAttributes( { hasDynamicContent } ) }
				/>
			</div>

			{ hasDynamicContent &&
				<div>
					<SelectContentSource
						source={ dynamicSource }
						onChange={ ( source ) => { setAttributes( { dynamicSource: source.value } ) } }
					/>

				</div>
			}
		</PanelArea>

	);
};
