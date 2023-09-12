import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				gradient1: 'linear-gradient(to bottom, transparent, #141414)',
			},
			keyframes: {
				rotation: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
			},
			animation: {
				'ani-rotation': 'rotation 1s linear infinite',
			},
		},
	},
	plugins: [require('tailwind-scrollbar'), require('tailwind-scrollbar-hide')],
};
export default config;
