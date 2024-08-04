# easy-tailwindcss for VSCode

[![Static Badge](https://img.shields.io/badge/Downloads-VSCode_Marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=josenromero.easy-tailwindcss)

Easy TailwindCss is designed to assist developers who are learning and using TailwindCSS. 
It provides a convenient way to find and apply TailwindCSS utility classes directly from within Visual Studio Code.

## Usage

- Follow these steps to use the Easy TailwindCss Extension:

1. **Installation**
  - Go to the Visual Studio Code Marketplace and search for "Easy TailwindCss".
  - Click "Install" to add the extension to your Visual Studio Code.

2. **API Key Setup**
  - Open the "Connection" panel from the sidebar.
  - Click the "Add your API key" button.
  - Enter your Gemini API key in the input field and press `Enter` to save it.

  ![Image 1 ](https://github.com/JosenRomero/easy-tailwindcss/blob/main/screenshots/img01.png?raw=true)
  
3. **Get TailwindCSS utility class**

  There are two ways to obtain the TailwindCSS utility class:

  - **Using the Sidebar Panel**

    - Open the "TailwindCSS Helper" panel from the sidebar.
    - In the input field, describe the utility class you need, for example, "fixed background".
    - Click the "Get Utility Class" button.
    - The extension will insert the correct TailwindCSS class at your cursor position.

  - **Using a Command:**

    This method avoids keeping the sidebar open and can be more convenient if you are not constantly using the sidebar with the extension open.

    - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the Command Palette.
    - Type `Help me with TailwindCss` and select the command.
    - Enter your description in the prompt, for example, "fixed background".
    - The extension will insert the correct TailwindCSS class at your cursor position.


## Features

- **Connection Panel**:
  - Easily enter your Gemini API key to enable communication with the AI service.

- **TailwindCSS Helper Panel**:
  - Enter a description of the utility you want to apply (e.g., "A black background" or "div centrado" or "かわいいテキスト") and receive the corresponding TailwindCSS class from Gemini's API.
  - Use the input field and button to quickly get the class without needing to remember the exact TailwindCSS syntax.

- **Help and Feedback Panel**:
  - Access documentation and feedback links for any questions or issues you may have with the extension.

## Notes
This extension is not an official TailwindCSS product. 
It is a third-party tool designed to enhance your development experience with TailwindCSS.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](https://github.com/JosenRomero/easy-tailwindcss/blob/main/LICENSE.txt) file for details.
