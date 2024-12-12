// content.js

if (!window.hasRun) {
  window.hasRun = true;

  console.log("Content script loaded and running!");

  function cleanText(text) {
    if (!text) return "";
    return text.replace(/\s+/g, ' ').trim();
  }

  function parseConversation() {
    const messages = [];
    // Update the selector based on the actual structure of the Meta Business Suite conversations
    const messageBlocks = document.querySelectorAll('div[class*="x1fqp7bg"]');

    console.log("Found message blocks:", messageBlocks);

    if (messageBlocks.length === 0) {
      console.warn("No message blocks found. Check the selectors.");
    }

    messageBlocks.forEach(block => {
      try {
        // Find message container
        const messageContainer = block.querySelector('div[class*="x1vjfegm"]');
        if (!messageContainer) {
          console.warn("Message container not found in block:", block);
          return;
        }

        // Get message content
        const messageElement = messageContainer.querySelector('div[class*="x1y1aw1k"]');
        if (!messageElement) {
          console.warn("Message element not found in container:", messageContainer);
          return;
        }

        // Get timestamp
        const timestampElement = block.parentElement.querySelector('div[class*="x14vqqas"]');
        const timestamp = timestampElement ? cleanText(timestampElement.textContent) : "Unknown Time";

        // Get sender info
        const imgElement = block.querySelector('img');
        const sender = imgElement ? imgElement.alt : "Unknown User";

        // Get message text
        const messageText = cleanText(messageElement.textContent);

        messages.push({
          timestamp: timestamp,
          sender: sender,
          message: messageText,
          is_automated: messageText.includes('Use the latest app')
        });
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });

    console.log("Parsed messages:", messages);

    return {
      conversation_data: messages,
      parsed_at: new Date().toISOString(),
      total_messages: messages.length
    };
  }

  function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Specify the subfolder within the default Downloads directory
    const folder = 'Conversations'; // Ensure this matches your desired folder name

    // Construct the full filename with the subfolder
    const fullFilename = `${folder}/${filename}`; // Use forward slashes

    console.log("Download URL:", url);
    console.log("Full Filename:", fullFilename);

    chrome.runtime.sendMessage(
      {
        action: "download",
        url: url,
        filename: fullFilename
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending download message:", chrome.runtime.lastError);
        } else {
          console.log("Download message sent successfully:", response);
        }
      }
    );
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "parseConversation") {
      console.log("Received parseConversation action.");
      try {
        const conversationData = parseConversation();
        if (conversationData.total_messages === 0) {
          console.warn("No messages parsed. Download will not proceed.");
          sendResponse({ status: "no_messages" });
          return;
        }
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `conversation_${timestamp}.json`;
        downloadJSON(conversationData, filename);
        sendResponse({ status: "success", filename: filename });
      } catch (error) {
        console.error("Error during parsing and downloading:", error);
        sendResponse({ status: "error", message: error.message });
      }
    }
  });
}
