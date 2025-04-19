

// It works.
// For now, need to be called manually
// and bound to the variable relevant to get good timing.

const type = "video/webm"
//const type = "video/mp4; codecs='avc1.42E01E, mp4a.40.2'"

export function recordVideo() {
	console.log("Record canvas")
	const canvas = document.querySelector("canvas")
	if (canvas === null) { alert("no canvas found "); return }

	var chunks = []
	var canvas_stream = canvas.captureStream(60) // fps


	// Create media recorder from canvas stream
	let media_recorder = new MediaRecorder(canvas_stream, {
		mimeType: type
	})

	// Record data in chunks array when data is available
	media_recorder.ondataavailable = (evt) => { chunks.push(evt.data) }


	document.addEventListener(
		"cycled",
		(e) => {
			media_recorder.stop()
		},
		false,
	)
	// Provide recorded data when recording stops
	media_recorder.onstop = () => {

		stop(chunks)
	}

	// Start recording using a 1s timeslice [ie data is made available every 1s)
	media_recorder.start(1000)

	return media_recorder


}

function stop(chunks) {

	// Gather chunks of video data into a blob and create an object URL
	var blob = new Blob(chunks, { type: type })
	const recording_url = URL.createObjectURL(blob)

	// Attach the object URL to an <a> element, setting the download file name
	const a = document.createElement('a')
	a.style = "display: none;"
	a.href = recording_url
	a.download = "video.webm"
	document.body.appendChild(a)

	// Trigger the file download
	a.click()

	setTimeout(() => {
		// Clean up - see https://stackoverflow.com/a/48968694 for why it is in a timeout
		URL.revokeObjectURL(recording_url)
		document.body.removeChild(a)
	}, 0)
};

export function recordAfter(s) {
	record()
	setTimeout(() => {
		document.dispatchEvent(new Event("cycled"))

	}, s * 1000)
}

