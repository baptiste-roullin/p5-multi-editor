import { createApp } from 'vue'
import slugify from '@sindresorhus/slugify'
import VueDatGui from "@cyrilf/vue-dat-gui"
import "../node_modules/@cyrilf/vue-dat-gui/dist/vue-dat-gui.css"

import { createPinia } from 'pinia'

import type { P5Vue } from '../index'
import App from './components/App.vue'
import './main.css'
import router from './router.ts'

export let importedSketches: P5Vue.Imports = {}
import files from './updateFilesList/files.json'

for (const file of files) {
	// JS and TS files are imported separately because of a Vite limitation in dynamic import
	// https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
	let sketch: P5Vue.Import

	if (file.ext === ".js") {
		sketch = await import(`../sketches/${file.name}.js`)
	}
	else if (file.ext === ".ts") {
		sketch = await import(`../sketches/${file.name}.ts`)
	}
	importedSketches[slugify(file.name)] = sketch
}

const aLen = files.length
const bLen = Object.keys(importedSketches).length
if (!bLen) {
	alert("Unable to import any sketch")
}
if (bLen < aLen) {
	console.log("unable to import some sketches")

}

const pinia = createPinia()
const app = createApp(App)
app.use(router)
	.use(pinia)
	.use(VueDatGui)
	.mount('#app')


