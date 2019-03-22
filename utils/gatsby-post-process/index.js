const {
	readFile,
	outputFile,
} = require(`fs-extra`)

const cwd = process.cwd()
const path = `${cwd}/public/admin/index.html`

async function postProcess(){
	console.log(`Post processing...`)
	try{
		let str = await readFile(path, `utf8`)
		str = str.replace(
			`<meta charset="UTF-8">`,
			`<meta name="robots" content="noindex" /><meta charset="UTF-8">`)
		await outputFile(path, str)
		console.log(`Post processed`)
	}
	catch (err) {
		console.log(`Failed to post process`)
		console.error(err)
		process.exit(1)
	}
}

postProcess()