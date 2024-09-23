# Microbit Web Bluetooth controller
The objective of this project is to control the micro:bit using a web interface + bluetooth web API.

the user provides an SVG file, prepared with inkscape for example.
In the SVG :
* put a "title" property => when clicked a message will be sent to microbit
* put a [keyCode](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) "label" property to send a message when key is pressed.
    * example: ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Space

The user must connect to micro:bit

He can then click on the activated SVG parts, and a bluetooth message will be sent to Micro:bit, with the event followed by a semi-column !

## Running example
https://chgarde.github.io/microweb/

## build
use build.sh

## links
- https://thegecko.github.io/microbit-web-bluetooth/docs/index.html
- https://github.com/WebBluetoothCG/web-bluetooth/blob/main/implementation-status.md
- on Linux, experimental features must be enabled : chrome://flags/#enable-experimental-web-platform-features

## Micro:bit makecode
- https://github.com/chgarde/gruebt2
- https://makecode.microbit.org/_f6d5DPdAdRfc
