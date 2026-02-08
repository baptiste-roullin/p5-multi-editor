import {
  ImageRecorder,
  type ImageRecorderOptions,
} from "@/capture/recorders/image-recorder"

export type PngRecorderOptions = ImageRecorderOptions

export class PngRecorder extends ImageRecorder {
  constructor(canvas: HTMLCanvasElement, options: PngRecorderOptions = {}) {
    super(canvas, "png", options)
  }
}
