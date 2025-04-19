export const usefulWidth = window.innerWidth * .88
export const usefulHeight = window.innerHeight * .90
import p5 from '../node_modules/p5/lib/p5.esm'

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



	//await new p5(null, document.querySelector("#p5-vue"))
	//await new p5()


}