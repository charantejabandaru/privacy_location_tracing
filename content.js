chrome.runtime.sendMessage({ action: "location_request" });
document.addEventListener("locationRequest", (event) => {
    console.log("Content script received location request");

    chrome.runtime.sendMessage(event.detail, (response) => {
        const responseEvent = new CustomEvent("locationResponse", { detail: response });
        console.log(responseEvent);
        document.dispatchEvent(responseEvent);
    });
});

const script = document.createElement('script');
script.src = chrome.runtime.getURL('injected.js');
(document.head || document.documentElement).appendChild(script);
script.onload = function () {
    this.remove();
};