<script setup lang="ts">

import { onMounted } from 'vue'
import { config, grid, star } from '../utils'
import p5 from 'p5'
import type global from 'node_modules/@types/p5/global.d.ts'

import { globalInit } from '@/globalUtils'


function mandala(p5: p5.Graphics, itemSize: number) {
	p5.rect(0, 0, itemSize, itemSize)

	p5.push()
	p5.translate(itemSize / 2, itemSize / 2)

	const innerRadius = itemSize * p5.random(.3, .9)
	const steps = Math.trunc(p5.random(3, 20))
	const innerRadiusRatio = innerRadius / steps
	const outerRadiusRatio = itemSize / steps
	const randCol = Math.trunc(p5.random(225, 255))
	const shadeRatio = randCol / steps
	const rotationRatio = p5.random(90, 200) / steps
	const pointCount = Math.trunc(p5.random(5, 15))

	/*	console.table(
			{
				"innerRadius": innerRadius,
				"steps": steps,
				"innerRadiusRatio": innerRadiusRatio,
				"outerRadiusRatio": outerRadiusRatio,
				"randCol": randCol,
				"shadeRatio": shadeRatio,
				"rotationRatio": rotationRatio,
				"pointCount": pointCount
			})*/
	for (let k = 0; k < steps; k++) {

		p5.fill(shadeRatio * k)
		p5.stroke(randCol - shadeRatio * k, 100)
		p5.push()

		p5.scale(.4)
		p5.rotate(rotationRatio * k * p5.PI / 180)
		star(p5, itemSize - outerRadiusRatio * k, innerRadius - innerRadiusRatio * k, pointCount, 0, 0)
		p5.pop()

	}
	p5.pop()
}

onMounted(() => {

	function draw() {
		grid(mandala, undefined, 300)
	}

	globalInit(draw, false)

})
</script>

<template>
	<main><canvas></canvas></main>
</template>
