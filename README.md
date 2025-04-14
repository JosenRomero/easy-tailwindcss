# easy-tailwindcss for VSCode

[![Static Badge](https://img.shields.io/badge/Downloads-VSCode_Marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=josenromero.easy-tailwindcss)
![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/josenromero.easy-tailwindcss)

Easy TailwindCss is designed to assist developers who are learning and using TailwindCSS. 
It provides a convenient way to find and apply TailwindCSS utility classes directly from within Visual Studio Code.

> [!NOTE]
> This extension is not an official TailwindCSS product. It is a third-party tool designed to enhance your development experience with TailwindCSS.

## 🚀 Usage

- Follow these steps to use the Easy TailwindCss Extension:

1. **Installation**
  - Go to the Visual Studio Code Marketplace and search for "Easy TailwindCss".
  - Click "Install" to add the extension to your Visual Studio Code.

2. **API Key Setup**
  - Open the "Connection" panel from the sidebar.
  - Click the "Add your API key" button.
  - Select an AI provider (Gemini or Groq).
  - Enter your API key in the input field and press `Enter` to save it.

  ![Add api key](https://raw.githubusercontent.com/JosenRomero/easy-tailwindcss/main/images/add_api_key.gif)
  
3. **Get TailwindCSS utility class**

  There are 3 ways to obtain the TailwindCSS utility class:

  - **Inline Tailwind Utility Generation**

    Open a file and type a descriptive message directly within `class` or `className` and between `|` characters..

    for example 
    ```className="|fixed background|"```

    ![Get tailwindcss utility class 01](https://raw.githubusercontent.com/JosenRomero/easy-tailwindcss/main/images/get_tailwindcss_utility_class_01.gif)

  - **Using the Sidebar Panel**

    - Open the "TailwindCSS Helper" panel from the sidebar.
    - In the input field, describe the utility class you need, for example, "fixed background".
    - Click the "Get Utility Class" button.
    - The extension will insert the correct TailwindCSS class at your cursor position.

    ![Get tailwindcss utility class 02](https://raw.githubusercontent.com/JosenRomero/easy-tailwindcss/main/images/get_tailwindcss_utility_class_02.gif)

  - **Using a Command:**

    This method avoids keeping the sidebar open and can be more convenient if you are not constantly using the sidebar with the extension open.

    - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the Command Palette.
    - Type `Help me with TailwindCss` and select the command.
    - Enter your description in the prompt, for example, "fixed background".
    - The extension will insert the correct TailwindCSS class at your cursor position.

    ![Get tailwindcss utility class 03](https://raw.githubusercontent.com/JosenRomero/easy-tailwindcss/main/images/get_tailwindcss_utility_class_03.gif)


## ✨ Features

- 🌍 Natural Language to Tailwind.
  Describe styles in English, Spanish or Japanese (e.g., "navbar with dark background and hover effects" or "texto centrado y de color negro" or "かわいいテキスト"), and get precise Tailwind classes.
- 🤖 Multi-AI Support.
  Gemini, Groq.
- ⚡Inline Tailwind Utility classes Generation.
  Write `className="|your descriptive message|"` → **Automatically replaced** with AI-generated classes.

## ⚙️ Settings

> **Easy TailwindCss** extension settings start with `easy-tailwindcss`.

| Setting                   | Default | Description                               |
|---------------------------|---------|-------------------------------------------|
| showConnectionView        | true    | Show or hide the Connection view.         |
| showTailwindCSSHelperView | true    | Show or hide the TailwindCSS Helper view. |
| showHelpAndFeedbackView   | true    | Show or hide the Help And Feedback view.  |

## Commands

| Command id                             | 	Title                   | Description                                                            |
|----------------------------------------|--------------------------|------------------------------------------------------------------------|
| easy-tailwindcss.askAPIkey             | Add your API key         | Enter your API key to enable communication with the AI service. |
| easy-tailwindcss.removeAPIkey          | Remove your API key      | Removes the stored API key from the extension.                         |
| easy-tailwindcss.helpMeWithTailwindCss | Help me with TailwindCss |	Allows to request a TailwindCSS utility class based on a description.  |

## Contributing

Something missing? [Create a pull request](https://github.com/JosenRomero/easy-tailwindcss/pulls)

Found a bug? [Create an issue](https://github.com/JosenRomero/easy-tailwindcss/issues)

## 🔑 License

This project is licensed under the Apache License 2.0. See the [LICENSE](https://github.com/JosenRomero/easy-tailwindcss/blob/main/LICENSE.txt) file for details.
