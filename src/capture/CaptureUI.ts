import type { CaptureState } from "@/capture/recorders/base"
import type { OutputFormat } from "@/capture/Capture"

export const getFrameCountStr = (count: number) => {
  return `${count}`.padStart(7, "0")
}

export const getElapsedTimeStr = (count: number, framerate: number) => {
  const elapsedTime = Math.floor((count * 1000) / framerate)
  const hours = Math.floor(elapsedTime / 3600000)
  const minutes = Math.floor((elapsedTime % 3600000) / 60000)
  const seconds = Math.floor((elapsedTime % 60000) / 1000)
  const milliseconds = Math.floor((elapsedTime % 1000) / 100)

  const minutesStr = minutes.toString().padStart(2, "0")
  const secondsStr = seconds.toString().padStart(2, "0")
  return `${hours}:${minutesStr}:${secondsStr}.${milliseconds}`
}

export const getEncodingProgressStr = (progress?: number) => {
  if (progress == null) {
    return "encoding"
  }
  const percentage = Math.round(progress * 100)
  return `encoding ${percentage}%`
}

const setDraggable = (container: HTMLDivElement) => {
  container.style.cursor = "move"
  let mousePos = { x: 0, y: 0 }
  let containerPos = { x: 0, y: 0 }
  let isDragging = false

  container.addEventListener("mousedown", (e) => {
    isDragging = true
    mousePos = { x: e.pageX, y: e.pageY }
    containerPos = { x: container.offsetLeft, y: container.offsetTop }
  })

  document.addEventListener("mouseup", () => {
    isDragging = false
  })

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return
    const diff = { x: e.pageX - mousePos.x, y: e.pageY - mousePos.y }
    container.style.left = `${containerPos.x + diff.x}px`
    container.style.top = `${containerPos.y + diff.y}px`
  })
}



export type UiState = {
  format?: OutputFormat
  framerate?: number
}

export type UiEventHandlers = {
  onClickRecordButton?: (e: MouseEvent) => void
  onChangeFormat?: (e: Event) => void
  onChangeFramerate?: (e: Event) => void
}


export function cleanUI(targetElement: Element) {

  if (targetElement.tagName !== "body") {
    if (targetElement.hasChildNodes()) {
      targetElement.children[0]!.remove()
    }
  }
  else {
    const defaultContainer = document.querySelector(".p5c-container")!
    defaultContainer.parentElement!.removeChild(defaultContainer)
  }
}

export const createUi = (
  parent: HTMLElement | Element,
  initialState: UiState,
  eventHandlers: UiEventHandlers = {},
) => {



  const container = document.querySelector("#p5c-container")!
  const recordButton = container.querySelector("#p5c-btn")! as HTMLFormElement
  const formatSelect = container.querySelector("#p5c-format")! as HTMLFormElement
  const framerateInput = container.querySelector("#p5c-framerate")! as HTMLFormElement
  const counter = container.querySelector("#p5c-counter") as HTMLFormElement


  if (initialState.format) {
    formatSelect.value = initialState.format
  }
  if (initialState.framerate) {
    framerateInput.value = `${initialState.framerate}`
  }

  if (eventHandlers.onClickRecordButton) {
    recordButton.addEventListener("click", eventHandlers.onClickRecordButton)
  }
  if (eventHandlers.onChangeFormat) {
    formatSelect.addEventListener("change", eventHandlers.onChangeFormat)
  }
  if (eventHandlers.onChangeFramerate) {
    framerateInput.addEventListener("change", eventHandlers.onChangeFramerate)
  }

  const updateUi = (
    state: CaptureState,
    count: number,
    framerate?: number,
    encodingProgress?: number,
  ) => {
    const status: CaptureState[] = ["idle", "capturing", "encoding"]

    status.forEach((s) => {
      container.classList.toggle(s, state === s)
    })
    recordButton.disabled = state === "encoding"
    formatSelect.disabled = state !== "idle"
    framerateInput.disabled = state !== "idle"

    if (state === "encoding") {
      counter.textContent = getEncodingProgressStr(encodingProgress)
      return
    }

    if (!framerate) {
      counter.textContent = getFrameCountStr(count)
      return
    }
    counter.textContent = getElapsedTimeStr(count, framerate)
  }

  return {
    updateUi,
  }
}
