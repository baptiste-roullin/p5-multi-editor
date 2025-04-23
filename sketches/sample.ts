import { ref } from 'vue'


defineProps(["bg"])
console.log(bg, bg.value)
export function draw() {
	background(0)
	fill(bg.value)
	rect(10, 10, 50, 50)
}


export function clicked() {
	if (value === 200) {
		value = 100
	} else {
		value = 200
	}
}