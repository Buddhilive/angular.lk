---
title: Setup and Installation
description: Guide for setting up your Angular development environment
---

## Setting Up the Development Environment

### 1. Installing Node.js and npm

Node.js is a JavaScript runtime that allows you to run JavaScript on your computer outside of a web browser. npm (Node Package Manager) comes bundled with Node.js and is used to manage packages and dependencies for your projects.

Steps to install Node.js and npm:

- Visit the official Node.js website: https://nodejs.org/
- Download the LTS (Long Term Support) version for your operating system.
- Run the installer and follow the installation wizard.
- To verify the installation, open a terminal or command prompt and run:
   
   ```sh
   node --version
   npm --version
   ```

These commands should display the installed versions of Node.js and npm.

### 2. Installing Angular CLI

Angular CLI (Command Line Interface) is a powerful tool that helps you create, develop, test, and manage your Angular projects.

#### Steps to install Angular CLI:

1. Open a terminal or command prompt.
2. Run the following command:

   ```sh
   npm install -g @angular/cli
   ```

The `-g` flag installs Angular CLI globally on your system.

3. To verify the installation, run:
   ```
   ng version
   ```
   This should display the version of Angular CLI installed.

### 3. Creating your first Angular project

Now that you have Node.js, npm, and Angular CLI installed, you're ready to create your first Angular project.

#### Steps to create a new Angular project:

- Open a terminal or command prompt.
- Navigate to the directory where you want to create your project.
- Run the following command:
   
   ```sh
   ng new my-first-angular-app
   ```

Replace `my-first-angular-app` with your desired project name.

- Angular CLI will prompt you with a series of questions:
   - Would you like to add Angular routing? (y/N): For beginners, you can choose 'N' (No) to keep things simple.
   - Which stylesheet format would you like to use? Select your preferred option (CSS, SCSS, Sass, or Less). If you're unsure, choose CSS.

- Wait for Angular CLI to create the project structure and install the necessary dependencies. This may take a few minutes.
- Once the project is created, navigate into the project directory:
   
   ```sh
   cd my-first-angular-app
   ```

- To run your new Angular application, use the following command:
   
   ```sh
   ng serve
   ```

- Open a web browser and go to `http://localhost:4200/`. You should see the default Angular application running.

Congratulations! You've just created and run your first Angular application.

### Additional tips:

1. Project structure: Take some time to explore the project structure created by Angular CLI. Key directories include:
   - `src/app`: Contains your application code
   - `src/assets`: For static assets like images
   - `src/environments`: For environment-specific configuration

2. Development server: The `ng serve` command starts a development server. It watches your files and automatically recompiles and reloads the application when you make changes.

3. Angular CLI commands: Familiarize yourself with other useful Angular CLI commands like `ng generate` (to create new components, services, etc.) and `ng build` (to build your application for production).

4. IDE setup: Consider using an IDE with good Angular support, such as Visual Studio Code with the Angular Language Service extension.

5. Learning resources: Refer to the official Angular documentation (https://angular.io/docs) for in-depth guides and API references.

This setup process lays the foundation for your Angular development journey. As you become more comfortable with these basics, you'll be ready to dive deeper into Angular's features and start building more complex applications.