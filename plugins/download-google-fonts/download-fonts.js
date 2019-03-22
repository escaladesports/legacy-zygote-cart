const {
	readFile,
	pathExists,
	ensureDir,
	outputFile,
} = require(`fs-extra`)
const { parse } = require(`url`)
const getUrls = require(`get-urls`)
const download = require(`download`)

const filePath = `./.cache/google-fonts/google-fonts.css`

module.exports = async () => {

	// Extract URLs from CSS
	let cssData = await readFile(filePath, `utf8`)
	const fontLinks = [...getUrls(cssData)]

	// Download font files
	const domains = []
	const fontPaths = []
	for(let i = fontLinks.length; i--;){
		const url = fontLinks[i].split(`)`)[0]
		const { pathname, protocol, hostname } = parse(url)
		const origin = `${protocol}//${hostname}`
		if(domains.indexOf(origin) === -1){
			domains.push(origin)
		}
		if (fontPaths.indexOf(pathname) === -1){
			fontPaths.push(pathname)
		}
		if(!await pathExists(`./.cache/google-fonts/fonts${pathname}`)){
			let dirPath = pathname.split(`/`)
			dirPath.pop()
			dirPath = dirPath.join(`/`)
			dirPath = `./.cache/google-fonts/fonts${dirPath}`
			await ensureDir(dirPath)
			await download(url, dirPath)
		}
	}

	// Replace domains with relative paths in CSS
	domains.forEach(domain => {
		while (cssData.indexOf(domain) !== -1) {
			cssData = cssData.replace(domain, `/google-fonts`)
		}
	})

	await outputFile(filePath, cssData)

}