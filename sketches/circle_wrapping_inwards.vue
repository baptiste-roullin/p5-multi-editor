<script setup lang="ts">
import { onMounted } from 'vue'
import { globalInit, usefulHeight, usefulWidth } from '@/globalUtils'
import recordVideo from '@/recordVideo'
onMounted(() => {

	const event = new Event("cycled")
	var currentTan = 0
	var pastTan = 0
	var numberOfPhases = 0
	var recording: boolean = false

	function recordVideoCircle(trigFn) {
		if (!currentTan) {
			pastTan = 0
		} {
			pastTan = currentTan
		}
		currentTan = trigFn

		if (currentTan < 0 && pastTan > 0) {
			console.log(numberOfPhases)
			numberOfPhases++

		}
		if (!recording) {
			recordVideo()
			recording = true
		}

		if (numberOfPhases > 1) {
			document.dispatchEvent(event)
		}
	}

	function draw() {
		background(2, 2, 2)
		fill(255)
		stroke(255, 255, 255)

		let sin = Math.sin(Date.now() / 5000)
		let factor = sin * 10000
		arc(
			//center point
			usefulWidth / 2,
			(usefulHeight / 2) - (factor / 2),
			//dimensions
			factor,
			factor,
			//border
			0,
			2 * Math.PI,
			//mode
		)

		recordVideoCircle(tan)
	}
	globalInit(draw, true)
})

</script>

<template>
	<main><canvas></canvas></main>
</template>
