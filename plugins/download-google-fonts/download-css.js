const GoogleFontsWebpackPlugin = require(`google-fonts-plugin`)

module.exports = async ({
	fonts,
	formats = [
		//`eot`,
		`woff2`,
		`woff`,
		//`ttf`,
		//`svg`,
	],
}) => {
	const googleFontsPlugin = new GoogleFontsWebpackPlugin({
		fonts,
		formats,
		outputDir: `.cache/google-fonts`,
		encode: false,
		minify: false,
		verbose: true,
	})
	await googleFontsPlugin.make()
}