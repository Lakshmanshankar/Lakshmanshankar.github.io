/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      fontSize:{
        base: '18px',
      }
    },
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
