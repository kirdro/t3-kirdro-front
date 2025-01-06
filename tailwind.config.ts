import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import { nextui } from '@nextui-org/react';

export default {
	content: [
		'./src/**/*.tsx',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-geist-sans)', ...fontFamily.sans],
			},
		},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			layout: {
				disabledOpacity: '0.3', // opacity-[0.3]
				radius: {
					small: '2px', // rounded-small
					medium: '4px', // rounded-medium
					large: '6px', // rounded-large
				},
				borderWidth: {
					small: '1px', // border-small
					medium: '1px', // border-medium
					large: '2px', // border-large
				},
			},
			themes: {
				light: {},
				dark: {},
			},
		}),
	],
} satisfies Config;
