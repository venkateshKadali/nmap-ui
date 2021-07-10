
const endPoint = 'http://localhost:5642/open-port/';
async function getOpenDetail(hostname){
    let finalUrl = endPoint+hostname;
    let nMapResponse = await fetch(finalUrl);
    let data = await nMapResponse.json();
    createTile(data);
}

function createTile(data){

    let hostName = data.hostName;
    let latest = data.latestScannedPorts;
    let history = data.historyScannedPorts;
    let newOnes = data.newlyAddedPorts;
    let deleted = data.deletedPorts;

    console.log("Hostname:"+ hostName);
    let parent1 = document.getElementById("open_port");
    while (parent1.firstChild) {
        parent1.removeChild(parent1.firstChild);
    }
    latest.forEach(e => {
        const tile = document.createElement("div");
        tile.className = "tiles"
        tile.innerHTML=`port:`+e.portNumber+`<br>protocol:`+e.portProtocol
        parent1.appendChild(tile);
    });

    const parent2 = document.getElementById("history_port");
    while (parent2.firstChild) {
        parent2.removeChild(parent2.firstChild);
    }
    history.forEach(e => {
        const tile_set = document.createElement("div");
        tile_set.className = "tiles_set"
        e.forEach(element => {
            const tile = document.createElement("div");
            tile.className = "tiles"
            tile.innerHTML=`port:`+element.portNumber+`<br>protocol:`+element.portProtocol
            tile_set.appendChild(tile);
        });
        parent2.appendChild(tile_set);
    });

    const parent3 = document.getElementById("new_port");
    while (parent3.firstChild) {
        parent3.removeChild(parent3.firstChild);
    }
    newOnes.forEach(e => {
        const tile = document.createElement("div");
        tile.className = "tiles"
        tile.innerHTML=`port:`+e.portNumber+`<br>protocol:`+e.portProtocol
        parent3.appendChild(tile);
    });

    const parent4 = document.getElementById("deleted_port");
    while (parent4.firstChild) {
        parent4.removeChild(parent4.firstChild);
    }
    deleted.forEach(e => {
        const tile = document.createElement("div");
        tile.className = "tiles"
        tile.innerHTML=`port:`+e.portNumber+`<br>protocol:`+e.portProtocol
        parent4.appendChild(tile);
    });
} 

function addOrRemoveloaderAndBlockPointerEvent() {
    let body_block = document.getElementById('body');
    let loader = document.getElementById('loader_container');
    body_block.classList.toggle("block-action");
    loader.classList.toggle("loader");
}

async function clickSubmit(){
    let hostname = document.getElementById("hostname");
    let text = hostname.value;
    const IPCHECK_REGEX = /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/;
    if (!IPCHECK_REGEX.test(text)) {
        alert("Enter Valid Domain Name");
        hostname.focus();
        return false;
    }
    if(text){
        addOrRemoveloaderAndBlockPointerEvent();
        await getOpenDetail(text);
        addOrRemoveloaderAndBlockPointerEvent();
    }
}  

function addOrRemoveloaderAndBlockPointerEvent() {
    let body_block = document.getElementById('body');
    let loader = document.getElementById('loader_container');
    body_block.classList.toggle("block-action");
    loader.classList.toggle("loader");
}
