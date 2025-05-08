export function draw() {
	background(0)
	fill(255)
	rect(10, 10, 50, 50)

	if (frameCount === 1) {
		const capture = P5Capture.getInstance()
		capture.start({
			format: "gif",
			duration: 100,
		})
	}
}