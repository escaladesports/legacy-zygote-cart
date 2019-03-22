const fetch = require(`isomorphic-fetch`)
const { readFile, outputFile } = require(`fs-extra`)
const { parse } = require(`toml`)
const homedir = require(`os`).homedir()

const cwd = process.cwd()
console.log(cwd)

async function fetchToken(){
	const keyPath = `${homedir}/.config/netlify`
	let key
	try{
		key = await readFile(keyPath, `utf8`)
		key = JSON.parse(key).access_token
	}
	catch(err){
		console.error(`Can't find key in "${keyPath}"\nPlease install and login with "netlifyctl" CLI`)
	}
	return key
}

async function fetchId(){
	let id
	try{
		let data = await readFile(`${cwd}/netlify.toml`, `utf8`)
		data = parse(data)
		id = data.Settings.ID
	}
	catch(err){
		console.error(`Can't find site ID in netlify.toml`)
	}
	return id
}

async function fetchEnv(token, id){
	let env
	try{
		let data = await fetch(`https://api.netlify.com/api/v1/sites/${id}.netlify.com?access_token=${token}`)
		data = await data.json()
		env = data.build_settings.env
	}
	catch(err){
		console.error(err)
		console.error(`Can't fetch environment from Netlify`)
	}
	return env
}

async function writeDotenv(env){
	const contents = []
	for(let key in env){
		const val = env[key].replace(/"/g, `\\"`)
		contents.push(`${key} = "${val}"`)
	}
	await outputFile(`${cwd}/.env`, contents.join(`\n`))
}

async function go(){
	const token = await fetchToken()
	const id = await fetchId()
	const env = await fetchEnv(token, id)
	await writeDotenv(env)
}

go()