// popup.js

document.getElementById('exportBtn').addEventListener('click', () => {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = "Processing...";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found.");
      statusDiv.textContent = "No active tab found.";
      return;
    }

    const tabId = tabs[0].id;

    // Inject the content script into the current tab
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId, allFrames: true },
        files: ['content.js']
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error injecting content script:", chrome.runtime.lastError);
          statusDiv.textContent = "Error: " + chrome.runtime.lastError.message;
          return;
        }

        // Send message to content script
        chrome.tabs.sendMessage(tabId, { action: "parseConversation" }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
            statusDiv.textContent = "Error: " + chrome.runtime.lastError.message;
          } else {
            if (response.status === "success") {
              console.log("Export successful:", response.filename);
              statusDiv.textContent = "Exported successfully!";
            } else if (response.status === "no_messages") {
              console.warn("No messages found to export.");
              statusDiv.textContent = "No messages found.";
            } else if (response.status === "error") {
              console.error("Error during export:", response.message);
              statusDiv.textContent = "Error: " + response.message;
            }
          }
        });
      }
    );
  });
});
