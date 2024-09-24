
# Hotel Management System

This project is a **Hotel Management System** built with React, Bootstrap, and various API functions. It enables users to view, filter, and manage hotel rooms, including the ability to add, edit, and delete rooms. Pagination functionality enhances the user experience, especially when dealing with large datasets.

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
Client
|   App.css, App.jsx, index.css, main.jsx, project_structure.txt
|
+---assets (various images like hotel, room, pool)
|
+---components
|   +---admin (Admin.jsx)
|   +---common (Header.css, Header.jsx, Parallax.jsx, SportsFacilities.jsx, etc.)
|   +---booking (BookingForm.jsx, ManageBookings.jsx, etc.)
|   +---Redux (Reducers and store files)
|   +---Models (CustomerModel.ts, RoomModel.ts, etc.)
|   +---Pages (Login.jsx, Profile.jsx, Registration.jsx, etc.)
|   +---room (AddRoom.jsx, RoomCard.jsx, RoomManagement.jsx, etc.)
|   +---user (Profile.jsx)
|   +---utils (ApiFunctions.js, axiosJWT.ts, notif.ts, etc.)
|
+---layout (Footer.jsx, MainHeader.jsx, NavBar.jsx)
|
+---Traveling
|   TravelingApplication.java
|   +---Advice (Global exception handling for Admin, JWT, Users, etc.)
|   +---Config (WebConfig.java for CORS, etc.)
|   +---Controller (BookedRoomController.java, RoomController.java, etc.)
|   +---Exceptions (ResourceNotFoundException.java, InvalidBookingsRequestException.java, etc.)
|   +---Model (Room.java, User.java, Customer.java, etc.)
|   +---Repo (Repositories for Admin, BookedRoom, Room, User, etc.)
|   +---Service (AdminService.java, BookingService.java, RoomService.java, etc.)
|   +---utills (JWT.java for token handling)
```

## Features

### Room Management
- View, filter, and manage hotel rooms.
- Pagination for handling large datasets.
- Room services like Spa, Fitness Room, and Business Center.

### Booking and User Management
- Room booking and history display.
- JWT-based authentication for secure access.
- User profile management.
- Admin features for room CRUD operations.

### Additional Features
- Real-time notifications.
- Responsive design across devices.
- Custom styling for UI components.

## Technologies Used

### Front-End
- **React**
- **Bootstrap**
- **React Icons**
- **React Router**
- **Axios**
- **React Hook Form**

### Back-End
- **Java**
- **Spring Boot**
- **Spring Security**
- **Hibernate**
- **MySQL**
- **JWT**

### Other Tools and Libraries
- **Notyf**
- **Lombok**
- **Maven**

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
   npm run dev
   ```
2. Open your browser and go to `http://localhost:5173` to view the application.

## Components

- **Header**: Displays the main navigation and branding.
- **MainHeader**: Secondary header with additional links.
- **Room**: Manages the display and functionality of individual rooms.
- **ExistingRooms**: Displays a list of all rooms with filtering and pagination.
- **AddPatients**: Manages patient details in the system.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any inquiries, feel free to reach out:

- **GitHub**: [moradi12](https://github.com/moradi12)
- **Email**: tamirmoradi@gmail.com
