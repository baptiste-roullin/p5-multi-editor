import { ref, computed, toRaw } from 'vue'
import { defineStore } from 'pinia'

export const p5Store = defineStore('p5Store', () => {


	const hasVars = ref(false)
	const vars = ref({})

	const setVars = function (newVars) {
		vars.value = newVars
	}

	const getVars = computed(() => vars.value)

	const getVar = computed(() => {
		return (folder: string, label: string) => {
			return vars.value[folder][label]
		}
	})


	return { vars, setVars, hasVars, getVars, getVar }
})


