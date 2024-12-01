/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md,svx}'],
	plugins: [
		// require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require("nightwind"),
	],
	theme: {
		nightwind: {
			typography: true,
			colors: {
				white: "gray.900",
				black: "gray.50",
			},
		},
	},
};