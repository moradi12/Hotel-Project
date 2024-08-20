
# Hotel Management System

This project is a Hotel Management System built with React, Bootstrap, and various API functions. It allows users to view, filter, and manage rooms in a hotel environment, including the ability to add, edit, and delete rooms. The project also includes pagination functionality to enhance the user experience when dealing with large data sets.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Structure

```
project-root/
│
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── MainHeader.js
│   │   ├── Room.js
│   │   ├── ExistingRooms.js
│   │   └── AddPatients.js
│   ├── assets/
│   │   └── images/
│   │       ├── sport.jpg
│   ├── styles/
│   │   ├── header.css
│   │   ├── mainheader.css
│   ├── App.js
│   ├── index.js
│   └── ...
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Features

- **Room Management**: View, filter, and manage rooms.
- **Pagination**: Navigate through large sets of room data efficiently.
- **Room Services**: Includes additional hotel services such as Spa, Fitness Room, and Business Center.
- **Add/Edit/Delete Rooms**: Manage rooms with CRUD operations.
- **Custom Styling**: Separate CSS files for specific components like `Header` and `MainHeader`.

## Technologies Used

- **React**: Front-end library for building the user interface.
- **Bootstrap**: CSS framework for responsive design.
- **API Integration**: Handles data fetching and state management.
- **React Icons**: For adding service icons to the hotel services section.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/moradi12/Hotel-Management-System.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Hotel-Management-System
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Components

- **Header**: Displays the main navigation and branding.
- **MainHeader**: Secondary header with additional links and options.
- **Room**: Handles the display and management of individual rooms.
- **ExistingRooms**: Shows a list of all rooms with filtering and pagination.
- **AddPatients**: Component for adding patient details to the system.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please reach out:

- **GitHub**: [moradi12](https://github.com/moradi12)
- **Email**: tamirmoradi@gmail.com
