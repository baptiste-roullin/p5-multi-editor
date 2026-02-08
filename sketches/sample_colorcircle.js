let angle = 0
let centerX, centerY
let currentColour, targetColour
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
	createCanvas(window.innerWidth * .74, window.innerHeight, undefined, document.querySelector("canvas"))
	background(backgroundColour)
	centerX = width / 2
	centerY = height / 2
	currentColour = color(244, 205, 0)
	targetColour = color(254, 47, 3)
};

export function draw() {
	angle += 0.03
	let x = centerX + cos(angle) * radius
	let y = centerY + sin(angle) * radius

	currentColour = lerpColor(currentColour, targetColour, 0.01)
	fill(currentColour)
	noStroke()
	ellipse(x, y, radius, radius)

	if (frameCount % 50 === 0) {
		targetColour = color(random(colours))
	}
}