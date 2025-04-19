import type global from 'node_modules/@types/p5/global.d.ts'

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
export async function globalInit(p5Primitives, isLoop = true) {
	let { setup } = p5Primitives
	window['windowResized'] = windowResized


	for (const primitive in p5Primitives) {
		if (primitive === "setup") {
			if (!setup || typeof setup !== "function") {
				setup = fallbacksetup
			}
		}
		window[primitive] = null
		window[primitive] = p5Primitives[primitive]
	}

	window['windowResized'] = windowResized


}