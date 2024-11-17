
# Hotel Management System

This **Hotel Management System** is a full-stack application designed to streamline hotel operations. Built using React, Bootstrap, and Java Spring Boot, it allows users to view, filter, and manage hotel rooms, book reservations, and handle user profiles. The system includes robust features for both administrators and customers, ensuring a seamless and secure user experience.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

This system is designed for managing hotel operations, including room reservations, user profiles, and administrative tasks. It offers a responsive, user-friendly interface with robust authentication and real-time notifications.

---

## Features

### **Room Management**
- View, filter, and manage hotel rooms.
- CRUD operations for rooms (add, edit, delete).
- Pagination to efficiently handle large datasets.
- Support for additional services like Spa, Fitness Room, and Business Center.

### **Booking Management**
- Room reservation with date validation.
- Display of booking history for users.
- Admin tools for managing bookings and customers.

### **User Management**
- JWT-based secure authentication.
- User roles: Admin and Customer.
- Profile management with editable details.

### **Additional Features**
- Real-time notifications using Notyf.
- Custom-designed Parallax and Sports Facilities sections.
- Fully responsive design for seamless usage on any device.

---

## Technologies Used

### **Front-End**
- React  
- Bootstrap  
- React Router  
- React Hook Form  
- Axios  
- React Icons  

### **Back-End**
- Java Spring Boot  
- Spring Security  
- Hibernate ORM  
- MySQL Database  
- JWT Authentication  

### **Additional Tools**
- Notyf for real-time notifications.  
- Maven for build and dependency management.  
- Lombok for reducing boilerplate code.

---

## Project Structure

```
Client
|   App.css, App.jsx, index.css, main.jsx
|
+---assets
|       (Contains images for rooms, facilities, and hotel branding)
|
+---components
|   +---admin
|   |       Admin.jsx
|   +---booking
|   |       BookingForm.jsx, ManageBookings.jsx
|   +---common
|   |       Header.jsx, MainHeader.jsx, Parallax.jsx, SportsFacilities.jsx
|   +---room
|   |       RoomCard.jsx, RoomManagement.jsx, AddRoom.jsx
|   +---utils
|           ApiFunctions.js, axiosJWT.ts, notif.ts
|           
+---layout
|       Footer.jsx, NavBar.jsx
|
Traveling (Back-End)
|   TravelingApplication.java
|   +---Config
|   |       WebConfig.java
|   +---Controller
|   |       RoomController.java, BookedRoomController.java
|   +---Model
|   |       Room.java, User.java
|   +---Service
|   |       RoomService.java, BookingService.java
|   +---Repo
|           RoomRepository.java, UserRepository.java
```

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/moradi12/Hotel-Management-System.git
   ```

2. **Navigate to the front-end directory**:
   ```bash
   cd sunsetQueen-hotel
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the back-end**:
   - Ensure that Java 11+ and MySQL are installed.
   - Configure `application.properties` with your MySQL credentials.
   - Start the Spring Boot server.

5. **Run the front-end**:
   ```bash
   npm run dev
   ```

---

## Usage

1. **Launch the application**:
   Open your browser and navigate to `http://localhost:5173`.

2. **Explore functionalities**:
   - Log in as an Admin to manage rooms and bookings.
   - Log in as a Customer to view and book rooms.

---

## Components

- **Header**: Main navigation bar.
- **RoomCard**: Displays individual room details.
- **RoomManagement**: Allows admins to manage room inventory.
- **Profile**: Manages user details and displays booking history.
- **BookingForm**: Handles room reservations with validations.
- **SportsFacilities**: Highlights available services.

---

## Contributing

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a detailed description of the changes"
   ```
4. Push to the branch and create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For inquiries, feel free to reach out:

- **GitHub**: [moradi12](https://github.com/moradi12)  
- **Email**: [tamirmoradi@gmail.com](mailto:tamirmoradi@gmail.com)  
