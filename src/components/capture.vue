<script setup lang="ts">

</script>

<template>
	<div id="capture-wrapper">
		<div id="p5c-container" class="idle">
			<div class="p5c-options">
				<div class="p5c-format-container">
					<label for="p5c-format">Format</label>
					<select id="p5c-format" class="p5c-format">
						<option value="webm">WebM</option>
						<option value="gif">GIF</option>
						<option value="mp4">MP4</option>
						<option value="png">PNG</option>
						<option value="jpg">JPG</option>
						<option value="webp">WebP</option>
					</select>
				</div>
				<div class="p5c-select-container">
					<label for="p5c-framerate">FPS</label>
					<input id="p5c-framerate" class="p5c-framerate" type="number" min="1">
				</div>
			</div>
			<div class="p5c-main">
				<label for="p5c-btn">Record</label>
				<button id="p5c-btn"></button>
			</div>
			<div id="p5c-counter"></div>
		</div>


	</div>
</template>

<style>
#p5c-container {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 0px;
	color: var(--color-slate-200);
	text-align: left;
	border-bottom: 1px solid var(--divider-light-2);

	.p5c-main {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	input,
	select {
		width: 60%;
		height: 27px;
	}

	input,
	select {
		border-radius: 0;
		background-color: var(--color-bg-light-mute);
		color: var(--color-text-dark)
	}


	label {
		width: 60px;
	}


	#p5c-btn {
		position: relative;
		width: 22px;
		height: 22px;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		background: var(--color-slate-200);
	}

	.p5c-options {
		display: flex;
		flex-direction: column;
	}

	.p5c-options>div {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: .4em;
		align-items: center;
		border-bottom: 1px solid var(--divider-light-2);
	}

	.p5c-format,
	.p5c-framerate {
		border: none;
		border-radius: 0px;

	}

	.p5c-format:focus,
	.p5c-framerate:focus {
		box-shadow: 0 0 0 2px rgba(0, 181, 216, 0.75);
	}

	.p5c-format:disabled,
	.p5c-framerate:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.p5c-format {
		cursor: pointer;
		padding: 4px 2px 4px 2px
	}

	.p5c-framerate {
		padding: 2px 0 4px 2px
	}


	#p5c-btn:after {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		content: "";
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #f56565;
		transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
	}

	#p5c-btn:hover::after {
		width: 16px;
		height: 16px;
	}

	#p5c-btn:disabled {
		background: #a0aec0;
		cursor: not-allowed;
	}

	#p5c-btn:disabled::after {
		background: #718096;
	}

	#p5c-btn:focus-visible {
		outline: 2px auto rgba(0, 181, 216, 0.75);
	}

	#p5c-counter {
		visibility: visible;
		opacity: 1;
		transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
	}

	#p5c-container.capturing .p5c-btn::after,
	#p5c-container.encoding .p5c-btn::after {
		width: 12px;
		height: 12px;
		border-radius: 10%;
	}

	#p5c-container.capturing .p5c-btn:hover::after,
	#p5c-container.encoding .p5c-btn:hover::after {
		width: 16px;
		height: 16px;
	}

	#p5c-container.idle .p5c-counter {
		opacity: 0;
		visibility: hidden;
		transform: translate(0, 30%);
	}

}
</style>