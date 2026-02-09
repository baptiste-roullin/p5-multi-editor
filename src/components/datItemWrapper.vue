<script setup lang="ts">

import { isObject } from '@/capture/utils'
const { label, folder } = defineProps(["index", "label", "folder"])
import { p5Store } from '@/store'
import { DatBoolean } from '@cyrilf/vue-dat-gui'

const store = p5Store()

function isNumberInput(varItem) {
	return (isObject(varItem) && typeof varItem.value === "number" ? true : false)
}
function isSelect(varItem) {
	return (isObject(varItem) && Array.isArray(varItem.options) ? true : false)
}


// Not used for DatString and DatBoolean. Assigning the ref to local variable loses the reactivity.
let varItem = store.vars[folder][label]

</script>

<template>

	<template v-if="typeof varItem === 'function'">
		<DatButton @click="varItem" :label="label" />
	</template>
	<template v-else-if="isNumberInput(varItem)">
		<DatNumber v-model="varItem.value" :min="varItem.min" :max="varItem.max" :step="varItem.step"
			:label="label" />
	</template>
	<template v-else-if="isSelect(varItem)">
		<DatSelect v-model="varItem.currentValue" :items="varItem.options" :label="label" />
	</template>
	<template v-else-if="typeof varItem === 'boolean'">
		<DatBoolean v-model="store.vars[folder][label]" :label="label" />
	</template>
	<template v-else-if="typeof varItem === 'string'">
		<DatString v-model="store.vars[folder][label]" :label="label" />
	</template>
	<template v-else>
		<div>Wrong data structure ⚠️</div>
	</template>

</template>


<style>
#app .nav-right {

	.vue-dat-gui {
		font-size: inherit;
		font-family: inherit;
		color: var(--color-text);
		background-color: var(--color-bg-dark);
		position: static;
		width: 100%;

		min-width: 0;

		.group {
			background-color: var(--color-bg-dark);

			li:not(.folder) {
				border-bottom: 1px solid var(--divider-light-2);
			}
		}




		select,
		input {
			background-color: var(--color-bg-light-mute);
			color: var(--color-text-dark);
			accent-color: var(--number-color);
		}

		.toggle-button {
			display: none;
		}

		ul {
			max-height: max-content;
			overflow-y: auto;
			margin-left: 0;

			.folder {
				ul li {
					padding-left: 0;
				}

				padding: 0;

				.text .text--inner {
					left: 0px
				}

			}

			.control-item.button label {
				text-decoration: underline;
				text-decoration-color: var(--number-color);
				display: block;
				padding-left: 70px;
				cursor: pointer;
			}

			.control-item {
				border-left: 0;

				.control>input[type="number"] {
					/* color: var(--number-color); */
					color: var(--color-text-dark);
				}
			}
		}
	}
}

@media (max-width: 1023px) {
	#app .nav-right {
		.group.group--main>ul {
			display: flex;
			flex-direction: row;
		}
	}
}

@media (max-width: 700px) {
	#app .nav-right {
		.group.group--main>ul {
			display: flex;
			flex-direction: column;
		}
	}
}
</style>