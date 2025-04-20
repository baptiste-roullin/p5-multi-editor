<script setup lang="ts">
import p5 from 'p5'
import type global from 'node_modules/@types/p5/global.d.ts'
import { onMounted } from 'vue'
import { globalInit, usefulHeight, usefulWidth } from '@/globalUtils'
import truchet_core from '../truchet'
import { reactive } from 'vue'

onMounted(() => {

	function draw() {
		truchet_core(
			{ "tile_size": 200, "height": usefulHeight, "width": usefulWidth, "curves_per_circle": 4, background_phase: 1, "seed": 1111 }
		)
	}
	globalInit(draw, false)

})
</script>

<template>
	<main><canvas></canvas></main>
</template>
