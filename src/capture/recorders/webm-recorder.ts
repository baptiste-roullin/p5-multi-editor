//TODO fix type import
declare module "webm-writer" {
  type WebMWriterOptions = {
    quality?: number
    fileWriter?: any
    fd?: any
    frameDuration?: number | null
    frameRate?: number | null
    transparent?: boolean
    alphaQuality?: number
  }

  class WebMWriter {
    constructor(options?: WebMWriterOptions)
    addFrame(
      frame: HTMLCanvasElement | string,
      alpha?: HTMLCanvasElement | string,
      overrideFrameDuration?: number,
    ): void
    addFrame(
      frame: HTMLCanvasElement | string,
      overrideFrameDuration?: number,
    ): void
    complete(): Promise<Blob | null>
  }
}


type WebmRecorderOriginalOptions = {
  webmWriterOptions?: WebMWriterOptions
}

import WebMWriter, { WebMWriterOptions } from "webm-writer"
import { Recorder } from "@/capture/recorders/base"
import { omitUndefinedProperty } from "@/capture/utils"

import type { RecorderOptions } from "@/capture/recorders/base"


export type WebmRecorderOptions = RecorderOptions & WebmRecorderOriginalOptions

type WebmRecorderDefaultOptions = Required<
  Pick<WebmRecorderOriginalOptions, "webmWriterOptions">
>

const defaultOptions: WebmRecorderDefaultOptions = {
  webmWriterOptions: {
    frameRate: 30,
    quality: 0.95,
  },
}

export class WebmRecorder extends Recorder {
  protected webmWriter: WebMWriter
  private mergedWebmOptions: WebmRecorderOriginalOptions &
    WebmRecorderDefaultOptions

  constructor(canvas: HTMLCanvasElement, options: WebmRecorderOptions = {}) {
    super(canvas, options)
    this.mergedWebmOptions = {
      ...defaultOptions,
      ...omitUndefinedProperty(options),
      webmWriterOptions: {
        ...defaultOptions.webmWriterOptions,
        ...omitUndefinedProperty(options.webmWriterOptions ?? {}),
      },
    }

    this.webmWriter = new WebMWriter(this.mergedWebmOptions.webmWriterOptions)
  }

  start() {
    this.checkStartable()
    this.state = "capturing"
    this.reset()
    this.emit("start")
  }

  stop() {
    this.checkStoppable()
    this.state = "encoding"
    this.emit("stop")
  }

  async postDraw() {
    try {
      switch (this.captureState) {
        case "capturing":
          this.copyCanvas()
          this.webmWriter.addFrame(this.canvas)
          this.increment()
          break
        case "encoding":
          this.state = "idle"
          const blob = await this.webmWriter.complete()
          this.reset()
          if (blob) {
            const filename = `${this.getBaseFilename(new Date())}.webm`
            this.emit("finished", blob, filename)
          }
          break
      }
    } catch (error) {
      if (error instanceof Error) {
        this.emit("error", error)
      }
    }
  }
}
