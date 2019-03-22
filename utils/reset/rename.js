const { basename } = require(`path`)
const {
	readFile,
	readJson,
	outputFile,
	outputJson,
	pathExists,
} = require(`fs-extra`)


function recursiveReset(options = {}, obj) {
	for (let i in obj) {
		if (i === `dependencies` || i === `devDependencies`) {
			continue
		}
		if (typeof obj[i] === `object`) {
			obj[i] = recursiveReset(options, obj[i])
		}
		else {
			obj[i] = obj[i].replace(options.oldName, options.name)
		}
	}
	return obj
}

async function renamePackage(options = {}) {
	if (!await pathExists(`package.json`)) {
		return console.log(`No package.json file found`)
	}
	console.log(`Renaming in package.json file...`)
	const pkg = await readJson(`package.json`)
	if (pkg.name) {
		options.oldName = pkg.name
		pkg.name = options.name
		recursiveReset(options, pkg)
	}
	if(pkg.keywords){
		pkg.keywords = pkg.name.toLowerCase().split(`-`)
	}
	if(pkg.version){
		pkg.version = `0.0.0`
	}
	await outputJson(`package.json`, pkg, { spaces: 2 })
}

async function rename(options = {}) {
	if (!options.name) {
		options.name = basename(process.cwd())
	}
	await renamePackage(options)
	await renameToml(options)
}


async function renameToml(options) {
	if (!await pathExists(`netlify.toml`)) {
		return console.log(`No netlify.toml file found`)
	}
	console.log(`Renaming in Netlify config...`)
	let config = await readFile(`netlify.toml`)
	config = config.toString()
	config = config.split(`\n`)
	for (let i = 0; i < config.length; i++) {
		let line = config[i]
		if (line.trim().indexOf(`ID = "${options.oldName}"`) === 0) {
			config[i] = line.replace(`ID = "${options.oldName}"`, `ID = "${options.name}"`)
			break
		}
	}
	config = config.join(`\n`)
	await outputFile(`netlify.toml`, config)
}

module.exports = rename
