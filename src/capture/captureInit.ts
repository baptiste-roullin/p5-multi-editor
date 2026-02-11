import p5 from "p5"
import { P5Capture } from "@/capture/capture"


const p5Capture = new P5Capture()
const targetElement = document.querySelector("#capture-wrapper")!

type Lifecycles = Record<
  "presetup" | "postsetup" | "predraw" | "postdraw" | "remove",
  () => void
>

type Addon = (p5: any, fn: any, lifecycles: Lifecycles) => void



P5Capture.setDefaultOptions({
  format: "gif",
  framerate: 10,
  quality: 0.7,
  width: 480,
  targetElement: targetElement
})

if (p5.registerAddon) {
  const captureAddon: Addon = function (_, __, lifecycles) {
    lifecycles.postsetup = function () {
      const p5 = this
      p5Capture.initialize.call(p5Capture, p5)
    }
    lifecycles.postdraw = p5Capture.postDraw.bind(p5Capture)
  }
  p5.registerAddon(captureAddon)

}

Object.assign(window, { P5Capture })
