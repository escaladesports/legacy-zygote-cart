const {
	pathExists,
	readFile,
	outputFile,
	remove,
	copy,
} = require(`fs-extra`)
const Hash = require(`object-hash`)
const downloadCSS = require(`./download-css`)
const mergeCSS = require(`./merge-css`)
const downloadFonts = require(`./download-fonts`)

const hashPath = `.cache/google-fonts/hash.txt`

exports.onPreBootstrap = async (_, options) => {
	const hash = Hash(options)
	if (!await pathExists(hashPath) || await readFile(hashPath, `utf8`) !== hash) {
		await remove(`./.cache/google-fonts`)
		await downloadCSS(options)
		await mergeCSS()
		await downloadFonts()
		await outputFile(hashPath, hash)
	}
	await copy(`./.cache/google-fonts/fonts`, `./public/google-fonts`)
}