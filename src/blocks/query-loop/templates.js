import { __ } from '@wordpress/i18n';

const templates = [
	{
		name: 'title-date-excerpt',
		title: __( 'Title, date, & excerpt', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M15 33h171v11H15zM15 51h79v5H15zM15 71h171v5H15zM15 82h171v5H15zM15 116h171v11H15zM15 134h79v5H15zM15 154h171v5H15zM15 165h171v5H15z" /></svg>,
		innerBlocks: [
			[ 'generateblocks/grid',
				{
					isQueryLoop: true,
					verticalGap: 40,
					lock: {
						remove: true,
					},
				},
				[
					[ 'generateblocks/container',
						{
							isQueryLoopItem: true,
							width: 100,
							lock: {
								remove: true,
								move: true,
							},
						},
						[
							[ 'generateblocks/headline', {
								isDynamicContent: true,
								contentType: 'post-title',
								dynamicLinkType: 'single-post',
								marginBottom: '5',
							} ],
							[ 'generateblocks/headline', {
								isDynamicContent: true,
								element: 'p',
								contentType: 'post-date',
								fontSize: 14,
							} ],
							[ 'generateblocks/headline', {
								isDynamicContent: true,
								element: 'div',
								contentType: 'post-excerpt',
							} ],
						],
					],
				],
			],
		],
	},
	{
		name: 'title-date',
		title: __( 'Title & date', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M14 30h171v11H14zM14 48h79v5H14zM14 88h171v11H14zM14 106h79v5H14zM14 146h171v11H14zM14 164h79v5H14z" /></svg>,
		innerBlocks: [
			[ 'generateblocks/grid',
				{
					isQueryLoop: true,
					verticalGap: 20,
					lock: {
						remove: true,
					},
				},
				[
					[ 'generateblocks/container',
						{
							isQueryLoopItem: true,
							width: 100,
							lock: {
								remove: true,
								move: true,
							},
						},
						[
							[ 'generateblocks/headline', {
								isDynamicContent: true,
								element: 'h2',
								fontSize: 20,
								contentType: 'post-title',
								dynamicLinkType: 'single-post',
								marginBottom: '5',
							} ],
							[ 'generateblocks/headline', {
								isDynamicContent: true,
								element: 'p',
								marginBottom: '0',
								contentType: 'post-date',
								fontSize: 14,
							} ],
						],
					],
				],
			],
		],
	},
	{
		name: 'two-columns',
		title: __( 'Two columns', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M14 28h78v11H14zM14 46h36.035v5H14zM14 66h78v5H14zM14 77h78v5H14zM108 28h78v11h-78zM108 46h36.035v5H108zM108 66h78v5h-78zM108 77h78v5h-78zM14 118h78v11H14zM14 136h36.035v5H14zM14 156h78v5H14zM14 167h78v5H14zM108 118h78v11h-78zM108 136h36.035v5H108zM108 156h78v5h-78zM108 167h78v5h-78z" /></svg>,
		innerBlocks: [
			[ 'generateblocks/grid',
				{
					isQueryLoop: true,
					verticalGap: 20,
					horizontalGap: 20,
					lock: {
						remove: true,
					},
				},
				[
					[ 'generateblocks/container',
						{
							isQueryLoopItem: true,
							width: 50,
							widthMobile: 100,
							backgroundColor: '#fafafa',
							paddingTop: '20',
							paddingRight: '20',
							paddingBottom: '20',
							paddingLeft: '20',
							lock: {
								remove: true,
								move: true,
							},
						},
						[
							[ 'generateblocks/headline', {
								isDynamicContent: true,
								element: 'h2',
								fontSize: 30,
								contentType: 'post-title',
								dynamicLinkType: 'single-post',
								marginBottom: '5',
							} ],
							[ 'generateblocks/headline', {
								isDynamicContent: true,
								element: 'p',
								marginBottom: '30',
								contentType: 'post-date',
								fontSize: 14,
							} ],
							[ 'generateblocks/headline', {
								isDynamicContent: true,
								element: 'div',
								contentType: 'post-excerpt',
							} ],
						],
					],
				],
			],
		],
	},
];

export default templates;
