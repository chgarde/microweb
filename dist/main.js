// function to load svg file
var loadFile = function (event) {
    var image = document.getElementById('drawing');
    image.data = URL.createObjectURL(event.target.files[0]);
    console.log("img loaded");
};

function sendMsg(msg) {
    log("Sending : " + msg);
    globalThis.services.uartService.send(enc.encode(msg)).then(x => console.log("message sent"));
}
// set click events on all SVG nodes that have a <title> element.
function setSvgEvents() {
    log("Scanning SVG for elements with &lt;title&gt;");
    // get the inner DOM of alpha.svg
    // please note that this will not work if index.html is opened locally. Please serve the files with a webserver.
    var svgDoc = a.contentDocument;
    // get the inner element by id
    r = svgDoc.evaluate("//*[local-name()='title']/..", svgDoc, null, XPathResult
        .UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log(r);

    for (let i = 0, length = r.snapshotLength; i < length; ++i) {
        var thisNode = r.snapshotItem(i)
        var title = "";
        var keyEvent = "";
        for (const child of thisNode.children) {
            if (child.tagName == "title") {
                title = child.textContent;
                keyCode = thisNode.getAttributeNodeNS("http://www.inkscape.org/namespaces/inkscape", "label").value;
                break;
            }
        }
        if (title != "") {
            log("Found " + title);

            function addEventHandler(event_type, msg, elem, title, keyCode) {
                elem.addEventListener(event_type, function (e) {
                    var finalmsg = msg + "_" + title + ";";
                    if (e.type == 'keydown' || e.type == 'keyup') {
                        if (e.code == keyCode) {
                            if (!e.repeat) {
                                sendMsg(finalmsg);
                            }
                        }
                    } else {
                        if (!(/touch/.test(e.type) && (e.touches.length !== e.targetTouches.length))) {
                            sendMsg(finalmsg);
                        } else {
                            log("your fingers are too big...");
                        }
                    }
                }, false);

            }
            addEventHandler("click", "click", thisNode, title);
            addEventHandler("mousedown", "down", thisNode, title);
            addEventHandler("mouseup", "up", thisNode, title);
            addEventHandler("touchstart", "down", thisNode, title);
            addEventHandler("touchend", "up", thisNode, title);
            addEventHandler("touchcancel", "stop", thisNode, title);
            //key events
            if (keyCode != "") {
                console.log("adding events");
                addEventHandler("keydown", "down", document, title, keyCode);
                addEventHandler("keyup", "up", document, title, keyCode);
            }

        }
    }
    log("---------------");


}


const logEl = document.getElementById("log");
const log = (message) => logEl.innerHTML = `${message}\n${logEl.innerHTML}`;
const logJson = (message) => log(JSON.stringify(message, null, 2));
const eventHandler = event => log(`${event.type}: ${JSON.stringify(event.detail, null, 2)}`);

var a = document.getElementById("drawing");
drawing.addEventListener("load", setSvgEvents, false);

if (!("TextEncoder" in window))
    alert("Sorry, this browser does not support TextEncoder...");

const enc = new TextEncoder(); // always utf-8
document.getElementById("connect").onclick = async () => {
    globalThis.device = await microbit.requestMicrobit(window.navigator.bluetooth);
    if (device) {
        globalThis.services = await microbit.getServices(device);

        if (services.deviceInformationService) {
            logJson(await services.deviceInformationService.readDeviceInformation());
        }

        if (services.uartService) {
            services.uartService.addEventListener("receiveText :", eventHandler);
            console.log("UART Service => OK");
        }
    }
}
