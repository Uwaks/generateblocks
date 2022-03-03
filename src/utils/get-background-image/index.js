import hexToRGBA from '../hex-to-rgba';

import {
	applyFilters,
} from '@wordpress/hooks';

export default function getBackgroundImageCSS( type, props ) {
	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		backgroundColor,
		backgroundColorOpacity,
		bgImage,
		bgImageInline,
		gradient,
		bgOptions,
		gradientColorOne,
		gradientColorOneOpacity,
		gradientColorTwo,
		gradientColorTwoOpacity,
		gradientColorStopOne,
		gradientColorStopTwo,
		gradientDirection,
		isDynamicContent,
		contentType,
	} = attributes;

	let gradientValue = '';

	if ( gradient ) {
		let gradientColorStopOneValue = '',
			gradientColorStopTwoValue = '';

		const gradientColorOneValue = hexToRGBA( gradientColorOne, gradientColorOneOpacity );
		const gradientColorTwoValue = hexToRGBA( gradientColorTwo, gradientColorTwoOpacity );

		if ( gradientColorOne && '' !== gradientColorStopOne ) {
			gradientColorStopOneValue = ' ' + gradientColorStopOne + '%';
		}

		if ( gradientColorTwo && '' !== gradientColorStopTwo ) {
			gradientColorStopTwoValue = ' ' + gradientColorStopTwo + '%';
		}

		gradientValue = 'linear-gradient(' + gradientDirection + 'deg, ' + gradientColorOneValue + gradientColorStopOneValue + ', ' + gradientColorTwoValue + gradientColorStopTwoValue + ')';
	}

	if ( 'gradient' === type ) {
		return gradientValue;
	}

	let backgroundImage = false;

	const backgroundColorValue = hexToRGBA( backgroundColor, backgroundColorOpacity );

	if ( !! bgImage || ( isDynamicContent && '' !== contentType ) ) {
		let url = bgImage?.image?.url;

		// @todo: Needs to get the dynamic image here.

		url = applyFilters( 'generateblocks.editor.bgImageURL', url, props );

		if ( 'element' === bgOptions.selector && ( backgroundColorValue || gradient ) && 'undefined' !== typeof bgOptions.overlay && bgOptions.overlay ) {
			// Old background image overlays mixed with our gradients.
			if ( gradient ) {
				backgroundImage = gradientValue + ', url(' + url + ')';
			} else if ( backgroundColorValue ) {
				backgroundImage = 'linear-gradient(0deg, ' + backgroundColorValue + ', ' + backgroundColorValue + '), url(' + url + ')';
			}
		} else {
			backgroundImage = 'url(' + url + ')';

			if ( bgImageInline && 'element' !== bgOptions.selector ) {
				backgroundImage = 'var(--background-image)';
			}
		}
	}

	return backgroundImage;
}
