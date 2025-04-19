import { watch, readdir, writeFile, open } from 'node:fs/promises'
import path from 'node:path'
(async () => {

	async function writeList(pathFile) {
		const cleanedFiles = (await readdir(pathFile))
			.filter(file => path.extname(file) === ".ts")
			.map(file => path.basename(file, ".ts"))

		const targetFile = await open(process.cwd() + "/src/files.json", 'w')
		await targetFile.writeFile(JSON.stringify(cleanedFiles))
		await targetFile.close()
	}

	try {
		const pathFile = process.cwd() + "/p5/"
		writeList(pathFile)
		const watcher = watch(pathFile)
		for await (const event of watcher) {
			console.log("file change: ", event.filename)
			writeList(pathFile)
		}


	} catch (err) {
		console.log(err)
	}
})()

