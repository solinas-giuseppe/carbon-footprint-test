/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		spacing: {
			0: '0px',
			0.25: '2px',
			0.5: '4px',
			0.7: '6px',
			1: '8px',
			1.25: '10px',
			1.5: '12px',
			1.75: '14px',
			2: '16px',
			2.25: '18px',
			2.5: '20px',
			3: '24px',
			4: '32px',
			5: '40px',
			6: '50px',
			7: '56px',
			8: '64px',
			9: '72px',
			10: '80px',
			12: '120px',
			'full-minus-header': 'calc(100vh - var(--header-height))'
		},
		fontFamily: {
			sans: ['var(--font-public-sans)'],
			brand: ['var(--font-raleway)']
		},
		fontWeight: {
			thin: 200,
			normal: 300,
			medium: 400,
			semibold: 500,
			bold: 600,
			bolder: 700,
			extrabold: 800
		},
		fontSize: {
			d2xl: '4.5rem', // 72px
			dxl: '3.75rem', // 60px
			dlg: '3rem', // 48px
			dmd: '2.25rem', // 36px
			dsm: '1.88rem', // 30px
			dxs: '1.50rem', // 24px
			txl: '1.25rem', // 20px
			tlg: '1.13rem', // 18px
			tmd: '1rem', // 16px
			tsm: '0.88rem', // 14px
			txs: '0.75rem' // 12px
		},
		lineHeight: {
			125: '125%',
			120: '120%',
			122: '122.222%',
			126: '126.667%',
			133: '133.333%',
			150: '150%',
			155: '155.556%',
			142: '142.857%',
			175: '175%',
			177: '177.778%'
		},
		colors: {
			base: {
				'000': 'var(--base-000)',
				300: 'var(--base-300)',
				500: 'var(--base-500)',
				600: 'var(--base-600)',
				700: 'var(--base-700)'
			},
			primary: {
				100: 'var(--primary-100)',
				400: 'var(--primary-400)',
				600: 'var(--primary-600)',
				900: 'var(--primary-900)'
			},
			secondary: {
				100: 'var(--secondary-100)'
			},
			interactive: {
				900: 'var(--interactive-900)'
			},
			success: {
				600: 'var(--success-600)'
			},
			error: {
				600: 'var(--error-600)'
			},
			warning: {
				200: 'var(--warning-200)',
				400: 'var(--warning-400)'
			}
		},
		boxShadow: {
			blue: '0px 0px 4px 3px var(--focus-primary)',
			green: '0px 0px 4px 3px var(--focus-secondary',
			'dark-green': '0px 0px 4px 3px var(--focus-tertiary)',
			branded: '0px -2px 0px 0px var(--brand-600) inset;'
		},
		borderRadius: {
			none: 'none',
			1: '0.25rem', // 4px
			2: '0.38rem', // 6px
			4: '0.5rem', // 8px
			5: '0.625', // 10px
			8: '1rem', // 16px
			12: '1.5rem', // 24px
			circle: '50%'
		},
		extend: {
			animation: {
				'fade-in': 'fadeIn .5s ease-in-out forwards'
			},

			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 }
				}
			}
		}
	},
	plugins: []
}
