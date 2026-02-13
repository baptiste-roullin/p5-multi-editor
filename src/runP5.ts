//This import brings in the runtime p5 value (to reference p5.Vector.random2D() etc)
import "p5/global"

import p5 from "p5"
import type { P5Vue } from '../index.d.ts'
import type { Ref } from 'vue'

const p5Globalprimitives = ['setup', 'draw', 'preload', 'deviceMoved', 'deviceTurned', 'deviceShaken', 'doubleClicked', 'mousePressed', 'mouseReleased', 'mouseMoved', 'mouseDragged', 'mouseClicked', 'mouseWheel', 'touchStarted', 'touchMoved', 'touchEnded', 'keyPressed', 'keyReleased', 'keyTyped', 'windowResized', 'preload', 'keyIsDown', 'keyTyped', 'keyReleased', 'keyPressed', 'doubleClicked', 'mouseClicked', 'mouseDragged', 'mouseMoved', 'mousePressed', 'mouseReleased', 'mouseWheel']

// We add our own
p5Globalprimitives.push("vars")

function windowResized() {
	resizeCanvas(window.innerWidth * .74, window.innerHeight)
}

export async function runP5(imports: Ref<P5Vue.Imports>, sketchName: string) {

	for (const sketchImport in imports.value) {

		if (!p5Globalprimitives.includes(sketchImport)) {
			console.log(`Are you sure you want to import the following: ${sketchImport} \n We can't do anything with it.`)

		}
		if (typeof imports.value[sketchImport] === "function") {
			//window[sketchImport] = null
			window[sketchImport] = imports.value[sketchImport]
		}
	}

	if (
		!(Object.hasOwn(imports.value, "setup")) && !(Object.hasOwn(imports.value, "draw"))
	) {
		throw "no draw or setup functions found"
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

	// second argument expects an id without "#"^
	new p5(null, `sketch-container`)

}