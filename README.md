# Chrome AI Showcase

**A showcase application to demonstrate the built-in Chrome AI APIs.**

## Demo

[Chrome AI Showcase](https://kevin-ratschinski.github.io/chrome-ai-showcase/)

## About This Project

This demo showcases Chrome's built-in on-device AI. The application is designed to:

- Check for the availability of the Chrome AI APIs.
- Support streaming responses from the model.
- Provide clear fallbacks and a mock mode if the APIs are not available.

Everything runs on-device, ensuring privacy. A network connection is only required for the initial model download.

**Browser Compatibility:** Requires Desktop Chrome version 138 or newer.

**Security Note:** Do not enter any sensitive content into the prompts.

## Features

This application demonstrates the following AI capabilities:

- **Prompt API:** A general-purpose text playground to interact with the language model.
- **Summarizer:** Summarizes long texts into concise versions.
- **Translation:** Translates text from one language to another.
- **Language Detector:** Detects the language of a given text.
- **Writer/Rewriter:** Generates or rewrites text based on user input.

## Development

To run this project locally, follow these steps:

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```
