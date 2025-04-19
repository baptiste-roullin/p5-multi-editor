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
export async function globalInit(draw, setup, isLoop = true) {

	if (!setup || typeof setup !== "function") {
		setup = fallbacksetup
	}



	window['windowResized'] = windowResized

	window['setup'] = null
	window['setup'] = setup
	window['draw'] = null
	window['draw'] = draw

	//@ts-ignore
	await new p5()



}