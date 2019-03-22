const React = require(`react`)
const globby = require(`globby`).sync
const { readFileSync } = require(`fs`)

exports.onRenderBody = ({ setHeadComponents }) => {
	const files = globby(`./public/google-fonts/**/*.woff2`)
	const css = readFileSync(`./.cache/google-fonts/google-fonts.css`)
	setHeadComponents([
		...files.map((file, key) => (
			<link
				key={`googleFont${key}`}
				rel='preload'
				as='font'
				type='font/woff2'
				crossOrigin='anonymous'
				href={file.replace(`./public`, ``)}
			/>
		)),
		<style
			key='googleFontsCSS'
			type='text/css'
			dangerouslySetInnerHTML={{__html: css}}
		/>,
	])
}