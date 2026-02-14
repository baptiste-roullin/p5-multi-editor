const selectOptions = ["50", "60", "70", "80"]
const selectCurrentValue = selectOptions[0]

export let vars = {
	Slider: {
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
			step: 1,
			showSlider: false
		},
	},
	"color picker": {
		color: {
			hex: "#ffff00"
		}
	},
	Select: {
		xPosition: { currentValue: selectCurrentValue, options: selectOptions }
	},
	Button: {
		yPosition: () => {
			y = y + 20
		}
	},
	Checkbox: {
		visibility: true
	},
	String: {
		title: "bonjour"
	}
}


let y = 50

export function setup() {
	createCanvas(window.innerWidth * .72, window.innerHeight, undefined)
	//createCanvas(480, 480, "webgl")
	frameRate(10)
}

export function draw() {
	background(0)
	const centerX = width / 2
	const centerY = height / 2
	let alpha = (vars.Checkbox.visibility ? 255 : 0)
	fill(vars.Slider.red.value, vars.Slider.green.value, vars.Slider.blue.value, alpha)
	rect(centerX - Number(vars.Select.xPosition.currentValue), centerY - y, 100, 100)
	fill(color(vars['color picker'].color.hex))
	circle(40, 40, 30)

	textSize(50)
	text(vars.String.title, centerX - 50, centerY - 100)
}