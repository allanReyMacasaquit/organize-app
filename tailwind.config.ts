import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

export default {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: '#5CA0D3', // Light blue main color
					100: '#4A90C2', // Darker shade of light blue for hover or accents
				},
				red: '#FF7474',
				error: '#b80000',
				green: '#3DD9B3',
				blue: '#56B8FF',
				pink: '#A3DAFF', // Lightened for subtle accents
				orange: '#FAC8A7', // Adjusted to be softer and complementary
				light: {
					100: '#1F3B54', // Darker blue for text
					200: '#A0C1E1', // Light blue-gray for secondary text
					300: '#EAF3FA', // Light background blue
					400: '#EFF6FB', // Very light background for highlights
				},
				dark: {
					100: '#102840', // Deep blue for contrast text or backgrounds
					200: '#183B5A', // Slightly lighter dark blue
				},
			},
			fontFamily: {
				poppins: ['var(--font-poppins)'],
			},
			boxShadow: {
				'drop-1': '0px 10px 30px 0px rgba(92, 160, 211, 0.1)', // Adjusted shadows to match bluish theme
				'drop-2': '0 8px 30px 0 rgba(92, 160, 211, 0.3)',
				'drop-3': '0 8px 30px 0 rgba(92, 160, 211, 0.1)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' },
				},
			},
			animation: {
				'caret-blink': 'caret-blink 1.25s ease-out infinite',
			},
		},
	},
	plugins: [tailwindAnimate],
} satisfies Config;
