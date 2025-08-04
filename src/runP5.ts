import type global from 'node_modules/@types/p5/global.d.ts'
// important
// even if not run in the file, keep it so Vite detects P5 as a dependency and bundles it.
import p5 from "p5"

export const usefulWidth = window.innerWidth * .88
export const usefulHeight = window.innerHeight * .90

function windowResized() {
	resizeCanvas(usefulWidth, usefulHeight)
}


function fallbacksetup(isLoop) {
	createCanvas(usefulWidth, usefulHeight, undefined, document.querySelector("canvas")!)
	frameRate(60)
	//saveCanvas(cnv, 'myCanvas.jpg');
	const setLoop = (isLoop ? loop : noLoop)
	//must be the last line
	setLoop()
}
export async function globalInit(p5Primitives, isLoop = true, slugifiedName) {

	for (const primitive in p5Primitives) {
		if (typeof p5Primitives[primitive] === "function") {
			window[primitive] = null
			window[primitive] = p5Primitives[primitive]
		}
	}

	if (!(Object.hasOwn(p5Primitives, "setup"))) {
		window['setup'] = null
		window['setup'] = fallbacksetup
	}

	if (!(Object.hasOwn(p5Primitives, "windowResized"))) {
		window['windowResized'] = null
		window['windowResized'] = windowResized
	}

	await new p5(null, `sketch-${slugifiedName}`)
}