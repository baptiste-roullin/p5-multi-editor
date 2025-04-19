import p5, { type RENDERER, type p5InstanceExtensions } from '../node_modules/p5/lib/p5.esm'

export default class p6 extends p5 {
	vertices(vertices, settings) {

		this.beginShape()
		vertices.forEach(element => {
			const [x, y] = element
			super.vertex(x, y)
		})
		this.endShape()
	}





	/*path(x, y, width, height, canvas, canvasSize) {
		if (Math.random() >= 0.5) {
			console.log(canvasSize)
			canvas.line(
				x,
				y,
				x + canvasSize,
				canvasSize + canvasSize
			)
		} else {
			canvas.line(
				x,
				y,
				canvasSize,
				canvasSize
			)
		}
	}*/
}


