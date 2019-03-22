const patchIdentity = require(`./netlify-identity`)
const patchCMS = require(`./gatsby-plugin-netlify-cms`)

async function patch(){
	await Promise.all([
		patchIdentity(),
		patchCMS(),
	])
}

patch()