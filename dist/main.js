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

            function addEventHandler(event_type, elem, title) {
                elem.addEventListener(event_type, function (e) {
                    var msg = e.type + "_" + title + ";";
                    log("Sending : " + msg);
                    globalThis.services.uartService.send(enc.encode(msg)).then(x => console.log("message sent"));
                }, false);
            
            }
            addEventHandler("click", thisNode, title);
            addEventHandler("mousedown", thisNode, title);
            addEventHandler("mouseup", thisNode, title);
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
