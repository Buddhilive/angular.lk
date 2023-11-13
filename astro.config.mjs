import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Angular ශ්‍රී ලංකා',
			social: {
				github: 'https://github.com/buddhilive/angular.lk',
			},
			logo: {
				src: './src/assets/angular_gradient.png',
			},
			favicon: '/favicon.ico',
			sidebar: [
				{
					label: 'මගපෙන්වීම',
					autogenerate: { directory: 'guides' },
				},
			],
			head: [
				// Example: add Fathom analytics script tag.
				{
					tag: 'meta',
					attrs: {
						name: 'monetag',
						content: '663e1176f6c8b3cc4a3de28af9c6e485'
					},
				},
			],
		}),
	],
	outDir: './docs'
});
