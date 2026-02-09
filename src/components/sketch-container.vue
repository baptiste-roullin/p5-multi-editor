	<script setup lang="ts">

	const { hasVars } = defineProps(["hasVars"])
	import { refreshKey } from "@/router"
	import navRight from "@/components/nav-right.vue"

</script>

<template>
	<div class="sketch-container" id="sketch-container" ref="sketch-container">
	</div>
	<Suspense>
		<navRight :hasVars="hasVars" :key="refreshKey" />
	</Suspense>
</template>

<style>
@media (min-width: 1024px) {

	#sketch-container {
		width: 76vw;
		height: 100%;
	}
}

@media (max-width: 1023px) {

	#sketch-container {
		width: 100vw;
		height: 100%;
	}
}
</style>

