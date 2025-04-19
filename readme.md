WARNING: VERY CRUDE, ABSOLUTELY UNFINISHED


# A p5.js multi editor

A local web application allowing quick switching between sketches. New p5 files are hot-reloaded automatically added to the left  bar.

The motivation is to provide the best of both worlds between the "default" mode and the [instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode#when-is-global-mode-assumed).

- Like [in the web editor](https://editor.p5js.org/), you can write concise code and quickly experiment with new sketches.
- Like in instance mode, you get inline documentation (by TS typings) and the comfort of a full IDE.

![](screenshot.png)


## Setup
1. Clone.
2. `npm install`.
5. Run `npm run dev` to launch the app and `update-files` to hot-reload files.
6. Add .ts files with p5 code in the folder named p5. See sample files for reference.


## How it works

Every file in the p5 folder must

- be a .ts file
- have a `draw` function
- exports this function with a named export (no `default`).

Everytime  you click on a sketch in the left bar, `draw()` and `setup()` are added to the global `window` object (replacing potential previous occurences) and the `p5()` constructor is called. This constructor picks these two function and execute them.

## Warnings

- No cross-platform testing
- No memory leak testing
- No performance test with heavy files (WebGL and such).

