<script setup lang="ts">
//ALL CREDITS TO https://github.com/junkiyoshi/Insta20230729/tree/main

import { onMounted } from 'vue'
import { globalInit, viewHeight, viewWidth } from '@/globalUtils'
import { createNoise2D } from 'simplex-noise'
import alea from 'alea'
import { recordAfter } from '@/recordVideo'

let deg_params = [0, 0, 0, 0]
onMounted(() => {

	function draw() {
		background(250)
		const radius = 100
		const randomRange = 1000
		const now = Date.now()
		translate(viewWidth / 2, viewHeight / 2)

		let index = -1
		const signs: number[] = []
		for (let index = 0; index < 4; index++) {
			const rand = random(0, 1)

			signs[index] = (Math.ceil(sin(now / 1800 + rand) >= 0 ? 1 : -1))


		}
		const rand = random(0, 2)
		console.log(sin(now / (1800)), sin(now / 1800 + rand))

		for (let x = -200; x <= 200; x += 400) {
			for (let y = -200; y <= 200; y += 400) {

				const noise2D = createNoise2D(/*alea(39)*/)
				const noise = noise2D(random(0, randomRange), now / 10000000)
				index++

				deg_params[index] += map(noise, 0, 1, 2 * signs[index], 4 * signs[index])
				console.log(signs)


				for (let deg = 0; deg < 360; deg += 15) {
					const x1 = radius * cos(radians(deg))
					const y1 = radius * sin(radians(deg))

					const x2 = x + radius * cos(radians(deg + deg_params[index]))
					const y2 = y + radius * sin(radians(deg + deg_params[index]))
					line(x1, y1, x2, y2)
					fill(0)
					circle(x1, y1, 4)
					circle(x2, y2, 4)
				}
			}
		}
	}
	globalInit(draw, true)
	//recordAfter(8)
})

</script>

<template>
	<main><canvas></canvas></main>
</template>
