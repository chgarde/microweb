#!/bin/bash
./build.sh
(cd dist && python3 -m http.server --bind 127.0.0.1 9000)
