# Microbit Web Bluetooth controller
The objective of this project is to control the micro:bit using a web interface + bluetooth web API.

the user provides an SVG file, prepared with inkscape for example.

This SVG will be scanned, and every object that has a "title" will become clickable.

The user must connect to micro:bit

He can then click on the activated SVG parts, and a bluetooth message will be sent to Micro:bit, with the event followed by a semi-column !

## Running example
https://chgarde.github.io/microweb/

## build
use build.sh

## check
https://thegecko.github.io/microbit-web-bluetooth/docs/index.html
https://github.com/WebBluetoothCG/web-bluetooth/blob/main/implementation-status.md
on Linux, experimental features must be enabled :
chrome://flags/#enable-experimental-web-platform-features

## Micro:bit makecode
https://github.com/chgarde/gruebt2
https://makecode.microbit.org/_f6d5DPdAdRfc
