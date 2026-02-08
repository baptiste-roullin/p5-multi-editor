//This import brings in the runtime p5 value (to reference p5.Vector.random2D() etc)
import "p5/global"

import p5 from "p5"
import type { P5Vue } from '../index.d.ts'
import type { Ref } from 'vue'

function windowResized() {
	resizeCanvas(window.innerWidth * .74, window.innerHeight)
}

function fallbacksetup() {
	createCanvas(window.innerWidth * .74, window.innerHeight, undefined)
	//createCanvas(480, 480, "webgl")
	frameRate(10)
}

export async function runP5(imports: Ref<P5Vue.Imports>, sketchName: string) {

	for (const sketchImport in imports.value) {
		if (typeof imports.value[sketchImport] === "function") {
			//window[sketchImport] = null
			window[sketchImport] = imports.value[sketchImport]
		}
	}

	if (!(Object.hasOwn(imports.value, "setup"))) {
		//window.setup = null
		window.setup = fallbacksetup
	}

	if (!(Object.hasOwn(imports.value, "windowResized"))) {
		//window.windowResized = null
		window.windowResized = windowResized
	}

	await import("./capture/captureInit.ts")
	/*	if (!sketchContainer) {
			throw `oops, coulnd't find HTML anchor for ${slugify(sketchName)}`
		} else {
			new p5(null, `sketch-${slugify(sketchName)}`)
		}*/

	// second argument expects an id without "#"
	new p5(null, `sketch-container`)

}