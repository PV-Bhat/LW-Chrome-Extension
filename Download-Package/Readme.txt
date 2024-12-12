LW Chrome Extension - Download Package

This folder contains all the necessary files required to set up the LW Chrome Extension. 
Follow the instructions below to load the extension into Chrome and start using it.

----------------------------------------------------
FILES INCLUDED:
----------------------------------------------------
- manifest.json      : Defines the extension's permissions and behavior.
- background.js      : Manages downloads and error handling.
- content.js         : Extracts and processes conversation data.
- popup.js           : Controls the popup UI and triggers the content script.
- popup.html         : Provides the user interface for the popup.
- icon16.png         : Extension icon (16x16 resolution).
- icon48.png         : Extension icon (48x48 resolution).
- icon128.png        : Extension icon (128x128 resolution).

----------------------------------------------------
INSTALLATION INSTRUCTIONS:
----------------------------------------------------
1. Open Google Chrome and navigate to:
   chrome://extensions/
2. Enable Developer Mode using the toggle in the top-right corner.
3. Click "Load unpacked" and select this folder.
4. The LW Chrome Extension icon should now appear in your browser toolbar.

----------------------------------------------------
USAGE INSTRUCTIONS:
----------------------------------------------------
1. Navigate to the conversation page in Meta Business Suite.
2. Click the LW Chrome Extension icon in the toolbar.
3. Click "Export Conversations" in the popup to export conversation data.
4. The JSON files will be saved to your browser's default Downloads directory.

----------------------------------------------------
CUSTOMIZATION (OPTIONAL):
----------------------------------------------------
If you wish to change the download location for JSON files:
1. Open background.js in a text editor.
2. Locate the line that specifies the download path.
3. Modify it to your preferred directory.

----------------------------------------------------
LICENSE:
----------------------------------------------------
This project is licensed under the MIT License. Refer to the LICENSE file for more details.

For further assistance, refer to the main README in the repository.
