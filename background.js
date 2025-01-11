let pendingResponse = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "location_request") {
        pendingResponse = sendResponse;

        chrome.action.openPopup();
        return true; 
    }

    if (message.action === "popup_response") {
        if (pendingResponse) {
            pendingResponse(message.data);
            pendingResponse = null;
        }
    }
});