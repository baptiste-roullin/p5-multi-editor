import { watch, readdir, writeFile, open } from 'node:fs/promises'
import path from 'node:path'

async function writeFileList(pathFile) {
	const cleanedFiles = (await readdir(pathFile))
		.filter(file => path.extname(file) === ".ts")
		.map(file => path.basename(file, ".ts"))
	const targetFile = await open(process.cwd() + "/src/files.json", 'w')
	await targetFile.writeFile(JSON.stringify(cleanedFiles))
	await targetFile.close()
}


(async function () {
	try {
		const pathFile = process.cwd() + "/sketches/"
		await writeFileList(pathFile)
		const watcher = watch(pathFile)
		for await (const event of watcher) {
			console.log("file change: ", event.filename)
			await writeFileList(pathFile)
		}

	} catch (err) {
		console.log(err)
	}
})()
function getFileList() {


}



