---
title: Introduction to Angular Language Kit
description: Introduction to Angular Language Kit
---

**Angular Language Kit** is a privacy-first AI chat application built with Angular. It leverages **Chrome's Built-in AI** (Gemini Nano) to run Large Language Models directly in your browser. This means your data is processed locally—**offline**—without ever being sent to a cloud server.

## 🚀 Features

- **🔒 Local Inference:** Uses the Chrome **Prompt API** to generate responses entirely on-device.
- **📂 Persistent History:** Chat sessions are saved locally using **IndexedDB**, keeping your conversations private and persistent across reloads.
- **🧠 Auto-Summarization:** Uses the Chrome **Summarizer API** to automatically generate concise titles for your chat sessions.
- **⚡ Real-time Streaming:** Implements full streaming responses for a snappy, conversational experience.
- **🎨 Modern UI:** Built with **Angular Material** and **Tailwind CSS** for a responsive, clean interface.
- **Token Tracking:** Real-time visualization of token usage and context window limits.

## 🛠 Architecture

The project is structured around strongly-typed services:

- **`PromptApiService`**: Manages the AI session lifecycle, streaming responses, and tracks token quota/usage (`inputUsage`, `inputQuota`).
- **`SummarizerService`**: Detects capabilities and generates headlines for new chats using the `window.ai.summarizer` API.
- **`StorageService`**: Handles all IndexedDB operations to store chat metadata and message history locally.
