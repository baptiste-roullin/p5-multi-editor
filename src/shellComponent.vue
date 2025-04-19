<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'


// important
import type global from 'node_modules/@types/p5/global.d.ts'

import { globalInit } from '@/runP5'

const route = useRoute()

async function initInsideComponent(fileName) {
	try {
		const name = String(fileName)
		const { draw } = await import(`../p5/${name}.ts`)
		let { setup } = await import(`../p5/${name}.ts`)

		globalInit(draw, setup)

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
	<!-- canvas el will be created and inserted by p5 -->
</template>