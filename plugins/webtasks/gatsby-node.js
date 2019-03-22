const { parse } = require(`path`)
const { spawn } = require(`child-process-async`)

exports.onPreBuild = async (_, {
	path,
	name,
	url = `https://sandbox.auth0-extend.com`,
	container,
	token,
	secrets,
	cron,
	shouldDeploy,
	timezone = `UTC`,
}) => {

	if (typeof shouldDeploy === `function` && !shouldDeploy()){
		return
	}
	if(typeof shouldDeploy === `boolean` && !shouldDeploy){
		return false
	}

	if(secrets){
		let parsedSecrets = []
		for(let i in secrets){
			parsedSecrets.push(`--secret ${i}=${secrets[i]}`)
		}
		secrets = parsedSecrets.join(` `)
	}

	const taskName = name || parse(path).name
	console.log(`Deploying webtask "${taskName}"...`)
	let cmd = [ `wt` ]
	if (cron) {
		cmd.push(`cron`)
	}
	cmd.push(`create`)
	if (cron){
		const schedule = typeof cron === `string`
			? cron
			: `0 0 * * *`
		cmd.push(
			`--schedule "${schedule}"`,
			`--tz ${timezone}`,
		)
	}
	cmd.push(
		`"${path}"`,
		`--bundle`,
		`--bundle-minify`,
		`--container "${container}"`,
		`--url "${url}"`,
		`--token "${token}"`,
		`--name "${taskName}"`,
	)
	if(secrets){
		cmd.push(secrets)
	}
	cmd = cmd.join(` `)
	try {
		await spawn(cmd, [], {
			shell: true,
			stdio: `inherit`,
		})
	}
	catch(err){
		console.error(err)
		process.exit(1)
	}
	console.log(`Deployed webtask "${taskName}"`)
}
