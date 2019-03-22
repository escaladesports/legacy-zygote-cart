const { remove } = require(`fs-extra`)

const cwd = process.cwd()
const path = `${cwd}/node_modules/gatsby-plugin-netlify-cms/gatsby-browser.js`

module.exports = async function patch(){
	try{
		await remove(path)
		console.log(`Patched gatsby-plugin-netlify-cms`)
	}
	catch (err) {
		console.log(`Failed to patch gatsby-plugin-netlify-cms`)
		console.log(err)
	}
}