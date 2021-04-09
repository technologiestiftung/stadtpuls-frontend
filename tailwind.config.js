const colors = require('tailwindcss/colors');

module.exports = {
	purge: [
		'./pages/**/*.tsx',
		'./src/**/*.tsx',
	],
	darkMode: false,
	theme: {
		colors: {
			white: '#FFFFFF',
			black: '#2f2f2f',
			gray: colors.coolGray,
			primary: '#1e3791',
			secondary: '#e60032',
		},
		fontFamily: {
			sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
		},
	},
	variants: {},
	plugins: [
		require('@tailwindcss/forms')
	],
}
