# LW Chrome Extension

LW Chrome Extension is a browser-based tool that enables users to export conversations from Meta Business Suite into JSON files, making it easy to analyze and process customer interaction data. This extension seamlessly integrates with Meta platforms, ensuring a smooth data extraction process.

## Features

- **Automated Data Extraction:** Extracts conversations from Meta Business Suite directly into JSON format.
- **Timestamped Exports:** Each export is saved with a unique timestamped filename for easy identification.
- **Pre-Packaged Files:** Includes all necessary files in a pre-structured `/Download-Package` folder for easy setup.
- **Error Handling:** Provides detailed feedback on missing messages or errors during export.
- **Compatibility:** Supports all major Meta platforms, including Facebook and Business Suite.

## Installation

### Download the Extension Files

1. Clone or download the repository:
   ```bash
   git clone https://github.com/<your-username>/LW-Chrome-Extension.git
   ```
2. Navigate to the `/Download-Package` folder in the repository. It contains all necessary files, including:
   - `manifest.json`
   - `background.js`
   - `content.js`
   - `popup.js`
   - `popup.html`
   - Required icon files (e.g., `icon16.png`, `icon48.png`, `icon128.png`)
3. Extract the `/Download-Package` folder to a preferred location on your computer.

### Load the Extension into Chrome

1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** using the toggle switch in the top-right corner.
3. Click **Load unpacked** and select the `/Download-Package` folder.
4. The LW Chrome Extension icon should appear in your browser's toolbar.

## Usage

1. Navigate to the conversation page within Meta Business Suite.
2. Click on the LW Chrome Extension icon in your browser's toolbar.
3. In the popup, click **Export Conversations**.
4. JSON files will automatically be saved to your browser's default Downloads directory. If the directory requires adjustment, see customization steps below.
5. The status message will indicate progress and completion.

### Customizing the Export Folder

If you need to save JSON files in a specific location:

1. Open the `background.js` file from the `/Download-Package` folder.
2. Locate the line that specifies the download path.
3. Update it to your desired directory.
   ```javascript
   const downloadPath = "Your/Preferred/Path/Conversations";
   ```

## File Structure

### Manifest File (`manifest.json`)

- **Purpose:** Defines the extension's permissions, host settings, and background scripts.
- **Key Permissions:**
  - Active Tab
  - Downloads
  - Tabs

### Content Script (`content.js`)

- Extracts conversation data by parsing DOM elements on the page.
- Cleans and structures data into JSON format.
- Sends the structured data to the background script for downloading.

### Background Script (`background.js`)

- Handles communication between the content script and the browser's download API.
- Initiates downloads and provides error handling for failed attempts.

### Popup Script (`popup.js`)

- Manages user interactions with the extension popup.
- Triggers the content script to parse and export data.

### Popup HTML (`popup.html`)

- Provides the user interface for the extension popup, allowing users to trigger exports.

## Development and Contribution

### Local Setup

- Ensure you have a working installation of Google Chrome.
- Use `console.log` in scripts for debugging and reviewing functionality.

### Contributions

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`feature/your-feature-name`).
3. Commit your changes.
4. Push the branch and submit a Pull Request.

## Known Issues

- **Selectors May Vary:** If the DOM structure of Meta Business Suite changes, updates to `content.js` may be required.
- **Customization Required:** Users must manually edit the `background.js` file to change the default export folder.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
