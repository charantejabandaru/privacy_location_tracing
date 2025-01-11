let pendingResponse = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "location_request") {
        // Store the response callback for later
        pendingResponse = sendResponse;

        // Open the popup for user input
        chrome.action.openPopup();
        return true; // Keep the message channel open
    }

    if (message.action === "popup_response") {
        // Process the response from the popup
        if (pendingResponse) {
            pendingResponse(message.data); // Send data back to content.js
            pendingResponse = null; // Clear the callback
        }
    }
});