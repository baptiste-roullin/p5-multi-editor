<script setup lang="ts">
import datItemWrapper from './datItemWrapper.vue'
import capture from './capture.vue'
import { DatFolder } from '@cyrilf/vue-dat-gui'

defineProps(["hasVars"])
import { p5Store } from '@/store'
const store = p5Store()


</script>

<template>
	<nav class="nav nav-right">
		<capture />
		<div id="dat-gui-wrapper" v-if="hasVars">
			<DatGui>
				<div v-for="(varObject, folder, index) in store.getVars" :key="index">
					<DatFolder :label="String(folder)">
						<div v-for="(varData, key, index) in varObject" :key="index">
							<datItemWrapper :index="index" :label="key" :folder="folder" />
						</div>

					</DatFolder>
				</div>


			</DatGui>
		</div>
		<div v-else>
			<p>No controllable data.</p>
		</div>
	</nav>
</template>

<style>
.nav-right {
	display: flex;
	flex-direction: column;
	gap: 1em
}
</style>