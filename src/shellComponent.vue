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

const props = defineProps(["fileName"])
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
</template>