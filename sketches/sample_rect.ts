export function setup() {
	createCanvas(window.innerWidth * .72, window.innerHeight, undefined)
	//createCanvas(480, 480, "webgl")
	frameRate(10)
}

export function draw() {
	fill(0, 255, 0)
	rect(10, 10, 50, 50)
}

