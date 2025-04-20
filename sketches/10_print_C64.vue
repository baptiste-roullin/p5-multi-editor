<script setup lang="ts">
import p5 from 'p5'
import { onMounted } from 'vue'
import { config } from '../../utils'

onMounted(() => {
	const sketch = (p5: p5) => {
		config(p5, true)
		p5.draw = function () {

			const size = 800
			const step = 50

			function path(x, y, width, height) {
				var leftOrRight = Math.random() >= 0.5

				if (leftOrRight) {
					p5.line(x, y, x + width, y + height)
				} else {
					p5.line(x + width, y, x, y + height)
				}
			}

			function setup() {
				p5.createCanvas(size, size)
				p5.background(220)

				for (var x = 0; x < size; x += step) {
					for (var y = 0; y < size; y += step) {
						path(x, y, step, step)
					}
				}

				p5.stroke(1)
			}

		}
	}
	new p5(sketch)
})
</script>

<template>
	<main><canvas></canvas></main>
</template>
