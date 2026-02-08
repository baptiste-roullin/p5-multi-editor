import type { Color } from 'p5'

let centerX = 0
let centerY = 0
let currentColour: Color
let targetColour: Color
let mouseXCurrent = 0
let mouseYCurrent = 0
let angle = 0

const radius = 200
const backgroundColour = "black"

const colours = [
	"#e75397",
	"#01b2e8",
	"#e8441f",
	"#ff6a00",
	"#f7a000",
	"#f4cd00",
	"#54ab1d",
	"#1b82e6",
	"#6d5acf",
	"#dddddd",
]

export function setup() {
	createCanvas(window.innerWidth * .74, window.innerHeight, undefined, document.querySelector("canvas")!)
	background(backgroundColour)
	centerX = width / 2
	centerY = height / 2
	currentColour = color(244, 205, 0)
	targetColour = color(254, 47, 3)
};

export function draw() {

	let x = mouseX + cos(angle)
	let y = mouseY + sin(angle)

	currentColour = lerpColor(currentColour, targetColour, 0.01)
	fill(currentColour)
	noStroke()
	ellipse(x, y, radius, radius)


	if (frameCount % 50 === 0) {
		if ((mouseX - mouseXCurrent > 15) || (mouseY - mouseYCurrent > 15)) {
			targetColour = color(random(colours))
		}
		//console.log(mouseX, mouseY)

	}
	mouseXCurrent = mouseX
	mouseYCurrent = mouseY
}
