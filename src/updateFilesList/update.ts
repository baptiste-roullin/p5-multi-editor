import { watch, readdir, writeFile, open } from 'node:fs/promises'
import { extname, parse } from 'node:path'

//TODO : replace with Vite plugin.

(async function () {
	function isJSFile(extname: string) {
		const check = /.(t|j)s$/.test(extname)
		//if (!check) { throw "ERROR\nnon-Javascript file was detected in the folder\nENDERROR" }
		return check
	}

	// Read all files in a folder, keep only JS and TS files and add that list to a JSON file,
	async function writeFileList(pathFolder: string) {
		const sketchList = (await readdir(pathFolder))
			.filter(file => isJSFile(extname(file)))
			.map(file => {
				const parsedFile = parse(file)
				return { name: parsedFile.name, ext: parsedFile.ext }
			})

		const targetFile = await open("./src/updateFilesList/files.json", 'w')
		await targetFile.writeFile(JSON.stringify(sketchList))
		await targetFile.close()
	}

	try {
		const pathFolder = "./sketches/"

		// cold start
		await writeFileList(pathFolder)

		// watch every change
		const watcher = watch(pathFolder)
		for await (const event of watcher) {
			console.log("file change: ", event.filename)
			await writeFileList(pathFolder)
		}
	} catch (err) {
		console.log(err)
	}
})()




