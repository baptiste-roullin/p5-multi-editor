export default function test() {
	const main = document.querySelector("main")
	Array.from(main!.children).forEach(element => {
		if (element.tagName === "canvas") {
			const msg = "canvas injected at the wrong place"
			alert(msg)
			throw "canvas injected at the wrong place"
		}
	})


	const container = document.querySelector("#sketch-container")
	if (container?.childElementCount! > 1) {
		const msg = "sketch container has more than one child"
		alert(msg)
		throw msg
	}
}