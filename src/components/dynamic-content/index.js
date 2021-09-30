import PanelArea from '../panel-area';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import dynamicContentAttributes from './attributes';
import SelectSource from './components/SelectSource';
import SelectPostType from './components/SelectPostType';
import SelectPosts from './components/SelectPosts';

export {
	dynamicContentAttributes,
};

export default ( { attributes, setAttributes } ) => {
	const {
		hasDynamicContent,
		dynamicSource,
		postType,
		postId,
	} = attributes;

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
					<SelectSource
						source={ dynamicSource }
						onChange={ ( option ) => { setAttributes( { dynamicSource: option.value } ) } }
					/>

					{ dynamicSource === 'post-type' &&
						<SelectPostType
							postType={ postType }
							onChange={ ( option ) => { setAttributes( { postType: option.value } ) } }
						/>
					}

					{ postType &&
						<SelectPosts
							postType={ postType }
							postId={ postId }
							onChange={ ( option ) => { setAttributes( { postId: option.value } ) } }
						/>
					}

				</div>
			}
		</PanelArea>

	);
};

function disableRichTextFormatting( disable, props ) {
	if ( 'undefined' !== typeof props.attributes.hasDynamicContent && props.attributes.hasDynamicContent ) {
		return true;
	}

	return disable;
}

addFilter(
	'generateblocks.editor.headlineDisableFormatting',
	'gp-premium/dynamic-headline/disable-headline-formatting',
	disableRichTextFormatting
);

addFilter(
	'generateblocks.editor.buttonDisableFormatting',
	'gp-premium/dynamic-headline/disable-button-formatting',
	disableRichTextFormatting
);
