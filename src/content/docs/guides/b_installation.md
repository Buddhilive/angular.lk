---
title: Setup and Installation
description: Guide for setting up your Angular Language Kit development environment
---

## ⚠️ Prerequisites (Chrome Setup)

This project relies on experimental Chrome APIs. You **must** use **Chrome Canary** (or Dev/Beta versions 128+) and enable specific flags.

1.  Open Chrome and navigate to `chrome://flags`.
2.  Search for and **Enable** the following flags:
    - `Enables optimization guide on device` &rarr; **Enabled BypassPerfRequirement**
    - `Prompt API for Gemini Nano` &rarr; **Enabled**
    - `Summarization API for Gemini Nano` &rarr; **Enabled** (Required for chat titles)
3.  **Restart Chrome**.
4.  Once loaded, the app will check API availability. If the model is not yet downloaded, Chrome will begin downloading the Gemini Nano model (approx. 1.5GB - 3GB). You can track progress in `chrome://components` under **Optimization Guide On Device Model**.

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/buddhilive/angular-lk.git](https://github.com/buddhilive/angular-lk.git)
    cd angular-lk
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    ng serve
    ```

4.  Navigate to `http://localhost:4200/`.
