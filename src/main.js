// function to load svg file
var loadFile = function (event) {
    var image = document.getElementById('drawing');
    image.data = URL.createObjectURL(event.target.files[0]);
    console.log("img loaded");
};

// set click events on all SVG nodes that have a <title> element.
function setSvgEvents() {
    log("Scanning SVG for elements with &lt;title&gt;");
    // get the inner DOM of alpha.svg
    var svgDoc = a.contentDocument;
    // get the inner element by id
    r = svgDoc.evaluate("//*[local-name()='title']/..", svgDoc, null, XPathResult
        .UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log(r);

    for (let i = 0, length = r.snapshotLength; i < length; ++i) {
        var thisNode = r.snapshotItem(i)
        var title = "";
        for (const child of thisNode.children) {
            if (child.tagName == "title") {
                title = child.textContent;
                break;
            }
        }
        if (title != "") {
            log("Found " + title);

            function addEventHandler(event_type, msg, elem, title) {
                elem.addEventListener(event_type, function (e) {
                    if (!(/touch/.test(e.type) && (e.touches.length !== e.targetTouches.length))) {
                        var finalmsg = msg + "_" + title + ";";
                        log("Sending : " + finalmsg);
                        globalThis.services.uartService.send(enc.encode(finalmsg)).then(x => console.log("message sent"));
                    }else{
                        log("your fingers are too big...");
                    }
                }, false);

            }
            addEventHandler("click", "click", thisNode, title);
            addEventHandler("mousedown", "down", thisNode, title);
            addEventHandler("mouseup", "up", thisNode, title);
            addEventHandler("touchstart", "down", thisNode, title);
            addEventHandler("touchend", "up", thisNode, title);
            addEventHandler("touchcancel", "stop", thisNode, title);
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
            console.log("UART Service => OK");
        }
    }
}
