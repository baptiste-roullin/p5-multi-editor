<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'


// "shell" because because it's barely a component, only a thin layer to run p5.js.
// Switching p5 sketches only reruns P5, it's always the same component instance.


import { globalInit } from '@/runP5'

const route = useRoute()

async function initInsideComponent(fileName) {
	try {
		const name = String(fileName)
		const p5Primitives = await import(`../sketches/${name}.ts`)

		globalInit(p5Primitives)

	} catch (error) {
		console.log(error)
	}
}

const bg = 200
watch(
	() => route.name,
	async name => {
		initInsideComponent(name)
	}
)


onMounted(async () => {
	//initInsideComponent(props.fileName)
})



</script>

<template>
	<!-- canvas element will be created and inserted by p5 -->
	<DatGui open-text="Open Controls" close-text="Close Controls" close-position="bottom">
		<!--	let gui = new dat.GUI()
		gui.add(this, "noiseScale", 0.0, 0.01, 0.0001)
		gui.add(this, "noiseScaleThickness", 0.0, 0.01, 0.001)
		gui.add(this, "amountSmall", 0, 2000, 10)
		gui.add(this, "amountMed", 0, 1000, 10)
		gui.add(this, "amountLarge", 0, 200, 5)
		gui.add(this, "minLength", 0, 100, 1)
		gui.add(this, "generate")-->

		<DatNumber v-model="bg" :min="0" :max="255" :step="10" label="bg" />

	</DatGui>
</template>