import { useDeviceType } from '../../hooks';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import BlockControls from './components/BlockControls';
import InspectorControls from './components/InspectorControls';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import Element from '../../components/element';
import IconWrapper from '../../components/icon-wrapper';
import InspectorAdvancedControls from '../grid/components/InspectorAdvancedControls';
import GoogleFontLink from './components/GoogleFontLink';
import ComponentCSS from './components/ComponentCSS';
import { createBlock } from '@wordpress/blocks';

const onSplit = ( attributes, clientId ) => ( ( value, isOriginal ) => {
	let block;

	if ( isOriginal || value ) {
		block = createBlock( 'generateblocks/headline', {
			...attributes,
			content: value,
		} );
	} else {
		block = createBlock( 'core/paragraph' );
	}

	if ( isOriginal ) {
		block.clientId = clientId;
	}

	return block;
} );

export default ( props ) => {
	const {
		attributes,
		setAttributes,
		onReplace,
		clientId,
	} = props;

	const {
		uniqueId,
		anchor,
		className,
		content,
		element,
		fontFamily,
		googleFont,
		googleFontVariants,
		icon,
		hasIcon,
		removeText,
		ariaLabel,
	} = attributes;

	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	useEffect( () => {
		if ( ! hasIcon && icon ) {
			setAttributes( { hasIcon: true } );
		}
	}, [] );

	let htmlAttributes = {
		className: classnames( {
			'gb-headline': true,
			[ `gb-headline-${ uniqueId }` ]: true,
			'gb-headline-text': ! hasIcon,
			[ className ]: undefined !== className,
		} ),
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/headline',
		attributes
	);

	const richTextFormats = applyFilters(
		'generateblocks.editor.headlineDisableFormatting',
		false,
		props
	) ? [] : null;

	return (
		<Fragment>
			<BlockControls attributes={ attributes } setAttributes={ setAttributes } deviceType={ deviceType } />

			<InspectorControls
				uniqueId={ uniqueId }
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				setDeviceType={ setDeviceType }
				blockState={ { deviceType } }
			/>
			<InspectorAdvancedControls anchor={ anchor } setAttributes={ setAttributes } />

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<GoogleFontLink
				fontFamily={ fontFamily }
				googleFont={ googleFont }
				googleFontVariants={ googleFontVariants }
			/>

			{ applyFilters( 'generateblocks.editor.beforeHeadlineElement', '', props ) }

			<Element tagName={ element } htmlAttrs={ htmlAttributes }>
				<IconWrapper
					hasIcon={ hasIcon }
					icon={ icon }
					hideChildren={ removeText }
					showWrapper={ ! removeText }
					wrapperClassname={ 'gb-headline-text' }
					ariaLabel={ ( ! removeText ? ariaLabel : undefined ) }
				>
					<RichText
						tagName="span"
						value={ content }
						onChange={ ( content ) => setAttributes( { content } ) }
						onSplit={ onSplit( attributes, clientId ) }
						onReplace={ onReplace }
						placeholder={ __( 'Headline', 'generateblocks' ) }
						allowedFormats={ richTextFormats }
					/>
				</IconWrapper>
			</Element>
		</Fragment>
	);
};
