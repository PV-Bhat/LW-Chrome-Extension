// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    chrome.downloads.download(
      {
        url: request.url,
        filename: request.filename,
        saveAs: true
      },
      (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error("Download failed:", chrome.runtime.lastError);
          sendResponse({ status: "failed", error: chrome.runtime.lastError.message });
        } else {
          console.log("Download initiated, ID:", downloadId);
          sendResponse({ status: "success", downloadId: downloadId });
        }
      }
    );
    // Return true to indicate you wish to send a response asynchronously
    return true;
  }
});
