<script setup lang="ts">
import p5 from 'p5'
import type P5 from 'p5'
import { onMounted } from 'vue'

import { config } from '../utils'

onMounted(() => {
	const sketch = (p5: P5) => {
		config(p5)

		p5.draw = function () {
			let angle = -3
			let sig = 0
			const width = window.innerWidth
			p5.background(220)
			p5.noFill()
			for (let i = 0; i < width; i++) {
				angle += .03
				sig = p5.map(p5.atan(angle), -p5.HALF_PI, p5.HALF_PI, 0, width)
				//console.log(p5.atan(angle), sig)

				p5.circle(width / 2, width / 2, (p5.round(sig)))
			}
			p5.noLoop()

		}
	}
	new p5(sketch)
})


</script>

<template>
	<main>
		<canvas></canvas>
	</main>
</template>
