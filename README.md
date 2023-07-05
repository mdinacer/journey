# Data Sheet App

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The Data Sheet App is a simple application that allows users to create and manage data sheets similar to Excel spreadsheets. The cells in the sheet are dynamically linked, meaning that changes in one cell can affect the values in other cells. The app provides a reactive and resizable data sheet interface and utilizes Redux for state management.

## Prerequisites

Before running the application, please ensure that you have the following dependencies installed:

- Node.js
- npm
- Docker (with the backend Docker image running)

## Getting Started

To get started with the Data Sheet App, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/your-username/data-sheet-app.git
```

2. Install the dependencies:
```shell
cd data-sheet-app
npm install
```

3. Start the application:
```shell
npm run dev
```

**Note:** Ensure that the backend Docker image is running.


## Usage

Once the Data Sheet App is up and running, you can access it in your web browser by visiting `http://localhost:3000`. The application provides a user-friendly interface for creating and managing data sheets. You can add, edit, and delete cells, and the changes will be reflected in real-time.

The application leverages Redux for state management, ensuring that the data is stored and synchronized across different components. The data is persisted using the backend Docker image, allowing you to retrieve your sheets even after restarting the application.


## Project Goal and Approach

The goal of this project was not to create a new Excel-like application, but rather to assess the candidate's proficiency in JavaScript/TypeScript and showcase their capabilities and skills in data management, API call integration, and error handling.

Throughout the development of this app, various techniques were employed to enhance user experience and optimize functionality. One notable technique implemented was the use of a debounce method to delay the saving operation while the user is still modifying the table. This helps to prevent excessive saving operations and improve performance. Alternatively, another method could involve creating an interval to save data (if changed) on a fixed interval. The choice of which method to use depends on the full application schema and specific needs.

The application serves as a demonstration of the candidate's technical skills and serves as a solid foundation for further enhancements and customization as per project requirements.


