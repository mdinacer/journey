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
git clone https://github.com/mdinacer/journey.git
```

2. Install the dependencies:
```shell
cd journey
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


## How it Works

When the application starts, a Redux slice is initiated with different states, such as the sheet size and the cells entity adapter. The table is then created with dynamic columns and rows count, which depends on the container size. The size is stored in the `sheetSize` state on the sheet slice.

All cells in the data sheet are editable and support direct values, equations, and formulas. The cells are dynamically linked, meaning that modifying one cell's value will update other cells that are referencing it.

An auto-save mechanism is implemented using a debounced function. When the user modifies the table, the debounce function is fired with a 1-minute delay. If the user makes another modification within that delay, the debounce will be restarted, and the saving will be done 1 minute after the latest change.

For the saving method, the data from active rows (rows that contain cells with values) is parsed and converted to CSV data format. The converted data is then sent to the backend API (`/save`).

The endpoint sends a response, and depending on that response, the app handles it as follows:

- **DONE:** Data is saved successfully.
- **PROGRESS:** The returned ID is stored, and a polling function is launched to check the status with the provided ID at a 5-second interval.
- **ERROR:** If the saving is not successful, a toast message will appear, and the save function will be retried.

If I had more time, here are some additional features I would consider adding:

- A status bar showing details about the sheet, such as the column count, row count, and selected cell.
- A section indicating the data status, such as whether it has been modified, saved, or has errors, with a dynamic status showing the saving operation status (e.g., auto-save in progress, data saved, error saving, retrying in n seconds).
- An auto-save option for the user, similar to the auto-save feature in applications like VSCode.

These additional features would further enhance the usability and functionality of the Data Sheet App.

