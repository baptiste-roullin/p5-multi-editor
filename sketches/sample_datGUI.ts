const selectOptions = ["50", "60", "70", "80"]
const selectCurrentValue = selectOptions[0]

export let vars = {
	slider: {
		red: {
			value: 255,
			min: 1,
			max: 255,
			step: 1
		},
		green: {
			value: 0,
			min: 1,
			max: 255,
			step: 1
		},
		blue: {
			value: 0,
			min: 1,
			max: 255,
			step: 1
		},
	},
	select: {
		xPosition: { currentValue: selectCurrentValue, options: selectOptions }
	},
	button: {
		yPosition: () => {
			y = y + 20
		}
	},
	checkbox: {
		visibility: true
	},
	string: {
		title: "bonjour"
	}
}


let y = 50

export function setup() {
	createCanvas(window.innerWidth * .74, window.innerHeight, undefined)
	//createCanvas(480, 480, "webgl")
	frameRate(10)
}

export function draw() {
	background(0)
	const centerX = width / 2
	const centerY = height / 2
	let alpha = (vars.checkbox.visibility ? 255 : 0)
	fill(vars.slider.red.value, vars.slider.green.value, vars.slider.blue.value, alpha)
	rect(centerX - Number(vars.select.xPosition.currentValue), centerY - y, 100, 100)
	textSize(50)
	text(vars.string.title, centerX - 50, centerY - 100)
}