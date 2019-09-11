require(`dotenv`).config({ silent: true })
const config = require(`./site-config`)
const proxy = require(`http-proxy-middleware`)

console.log(process.env.STRIPE_API_SECRET)
module.exports = {
	plugins: [
		// Build plugins
		{
			resolve: `gatsby-plugin-emotion`,
			options: {
				hoist: true,
				sourceMap: true,
			},
		},
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-catch-links`,
		`gatsby-plugin-remove-trailing-slashes`,
		{
			resolve: `email-templates`,
			options: {
				files: `email-templates/**/*`,
				siteUrl: process.env.URL || config.siteUrl,
			},
		},
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				exclude: [`/email-templates/*`],
			},
		},
		{
			resolve: `gatsby-plugin-robots-txt`,
			options: {
				policy: [{
					userAgent: `*`,
					disallow: [`/email-templates`],
				}],
			},
		},
		`gatsby-plugin-netlify`,
		// {
		// 	resolve: `gatsby-source-stripe`,
		// 	options: {
		// 		objects: [`skus`, `plans`],
		// 		secretKey: process.env.STRIPE_API_SECRET,
		// 	},
		// },
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/markdown`,
				name: `pages`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/static/uploads`,
				name: `uploads`,
			},
		},
		{
			resolve: `gatsby-plugin-markdown-pages`,
			options: {
				path: `./src/markdown/pages`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
					{
						resolve: `gatsby-remark-external-links`,
						options: {
							target: `_blank`,
						},
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 1200,
							linkImagesToOriginal: false,
							withWebp: {
								quality: 95,
							},
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl: config.siteUrl,
			},
		},
		// {
		// 	resolve: `webtasks`,
		// 	options: {
		// 		name: `gatsby-boilerplate-autodeploy`,
		// 		path: `src/webtasks/autodeploy.js`,
		// 		container: process.env.WEBTASKS_CONTAINER,
		// 		token: process.env.WEBTASKS_TOKEN,
		// 		cron: `0 0 * * *`,
		// 		secrets: {
		// 			BUILD_HOOK: process.env.BUILD_HOOK,
		// 		},
		// 		shouldDeploy: process.env.BRANCH === `master`,
		// 	},
		// },

		// Client plugins
		`route-delayed-animation`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-polyfill-io`,
		{
			resolve: `gatsby-plugin-favicon`,
			options: {
				logo: `./src/img/icon.png`,
				injectHTML: true,
				icons: {
					android: false,
					appleIcon: false,
					appleStartup: false,
					coast: false,
					favicons: true,
					firefox: false,
					twitter: false,
					yandex: false,
					windows: false,
				},
			},
		},
		{
			resolve: `google-analytics`,
			options: {
				trackingId: `UA-2411855-12`,
				// anonymize: true,
				// respectDNT: true,
			},
		},
		{
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: `GTM-NL2RJJM`,
				includeInDevelopment: true,
			},
		},
		// {
		// 	resolve: `download-google-fonts`,
		// 	options: {
		// 		fonts: [
		// 			{
		// 				family: `Oswald`,
		// 				subsets: [ `latin` ],
		// 			},
		// 			{
		// 				family: `Open Sans`,
		// 				subsets: [ `latin` ],
		// 			},
		// 		],
		// 	},
		// },
	],
	siteMetadata: config,
	developMiddleware: app => {
		app.use(
			`/.netlify/functions/`,
			proxy({
				target: `http://localhost:9000`,
				pathRewrite: {
					'/.netlify/functions/': ``,
				},
			})
		)
	},
}
