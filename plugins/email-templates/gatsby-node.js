const postProcess = require(`./post-process`)

exports.onPostBuild = async (_, { files, siteUrl }) => {
	await postProcess(files, siteUrl)
}