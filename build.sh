#!/bin/bash
npm update

# follow instructions at https://medium.com/weekly-webtips/import-use-npm-modules-in-the-browser-easily-e70d6c84fc31
# node_modules/.bin/browserify forbrowserify.js -s microbit > microbit-web-bluetooth.js

./node_modules/.bin/browserify src/forbrowserify.js -s microbit > dist/microbit-web-bluetooth.js

cp src/index.html src/main.js dist/
cp -av src/images dist/