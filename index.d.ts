export type P5CaptureState = "idle" | "capturing" | "encoding"
export type P5CaptureFormat = "webm" | "gif" | "mp4" | "png" | "jpg" | "webp"

export type P5CaptureOptions = {
	format?: P5CaptureFormat
	framerate?: number
	bitrate?: number
	quality?: number
	width?: number
	height?: number
	duration?: number | null
	autoSaveDuration?: number | null
	baseFilename?: (date: Date) => string
	imageFilename?: (index: number) => string
	beforeDownload?: (
		blob: Blob,
		context: {
			filename: string
			format: P5CaptureFormat
		},
		next: () => void,
	) => Promise<void> | void
	verbose?: boolean
}

export type P5CaptureGlobalOptions = P5CaptureOptions & {
	disableUi?: boolean
	disableScaling?: boolean
}

declare global {
	class P5Capture {
		static setDefaultOptions(options: P5CaptureGlobalOptions): void
		static getInstance(): P5Capture
		get state(): P5CaptureState
		start(options?: P5CaptureOptions): Promise<void>
		stop(): Promise<void>
	}

}

/*function isP5Function(name: string): name is "setup" | "draw" {
	return (pet as Fish).swim !== undefined
}
*/

declare var Window: {
	[functionNames]: () => void
}

type functionNames = preload | setup | save | deviceTurned | deviceShaken | deviceMoved | keyIsDown | keyTyped | keyReleased | keyPressed | doubleClicked | mouseClicked | mouseDragged | mouseMoved | mousePressed | mouseReleased | mouseWheel

/*export type p5GlobalFunction = <K extends keyof functionNames> () => void | boolean
*/namespace P5Vue {

	export interface sketchVars {
		[key: string]: Record<string, Record<string, any> | []>
	}

	export interface Import {
		[key: string]: sketchExport/*| unknown*/
	}

	export interface Imports {
		[key: string]: Import
	}

}