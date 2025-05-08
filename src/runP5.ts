export const usefulWidth = window.innerWidth * .88
export const usefulHeight = window.innerHeight * .90
import p5 from '../node_modules/p5/lib/p5.esm'

function windowResized() {
	resizeCanvas(usefulWidth, usefulHeight)
}

import { P5Capture } from "./capture/p5.capture"


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

	const p5Capture = new P5Capture()

	if (p5.registerAddon) {
		// p5.js v2
		const myAddon: Addon = function (_, __, lifecycles) {
			lifecycles.postsetup = function () {
				const p5 = this
				p5Capture.initialize.call(p5Capture, p5)
			}
			lifecycles.postdraw = p5Capture.postDraw.bind(p5Capture)
		}
		p5.registerAddon(myAddon)
	} else {
		// p5.js v1
		p5.prototype.registerMethod("init", function (this: any) {
			const p5 = this
			p5Capture.initialize.call(p5Capture, p5)
		})
		p5.prototype.registerMethod("post", p5Capture.postDraw.bind(p5Capture))
	}

	Object.assign(window, { P5Capture })




	window['windowResized'] = windowResized



	//await new p5(null, document.querySelector("#p5-vue"))
	//await new p5()


}