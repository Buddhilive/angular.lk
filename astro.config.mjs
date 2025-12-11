import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.angular.lk',
	integrations: [
		starlight({
			title: 'Angular Language Kit',
			social: {
				github: 'https://github.com/buddhilive/angular-lk',
			},
			logo: {
				src: './src/assets/angular_gradient.png',
			},
			favicon: '/favicon.ico',
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
			],
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'sitemap',
						href: '/sitemap-index.xml'
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'monetag',
						content: '663e1176f6c8b3cc4a3de28af9c6e485'
					},
				},
			],
		}),
		sitemap()
	],
	outDir: './docs'
});
