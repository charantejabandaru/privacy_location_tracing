chrome.runtime.sendMessage({ action: "location_request" });
document.addEventListener("locationRequest", (event) => {
    console.log("Content script received location request");

    // Relay the request to the background script
    chrome.runtime.sendMessage(event.detail, (response) => {
        // Send the response back to the injected script
        const responseEvent = new CustomEvent("locationResponse", { detail: response });
        console.log(responseEvent);
        document.dispatchEvent(responseEvent);
    });
});

const script = document.createElement('script');
script.src = chrome.runtime.getURL('injected.js'); // Path to injected.js in the extension
(document.head || document.documentElement).appendChild(script);
script.onload = function () {
    this.remove(); // Remove the script element after it has been loaded
};