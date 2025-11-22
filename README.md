<p align="center">
  <img src="https://dummyimage.com/1200x250/222/ffffff&text=Queue+Management+System" />
</p>
<p align="center">
A lightweight web application designed to simplify customer queue handling by assigning queue numbers and predicting service times.
</p>

---

## About the Project
This system was built during FOSS Hackathon 2025, a 36-hour national-level hackathon.
The goal was to create a functional, minimal, and efficient queue management workflow suitable for small businesses, clinics, and service desks.

---

## Features


- Add customers with name and phone number
- Auto-generate sequential queue numbers
- Predict service time using fixed 8-minute intervals
- Display the full queue in real time
- Remove served customers and refresh wait times
- Clean UI designed for quick staff usage

---

## Tech Stack
- Front-end : HTML, CSS, JavaScript

- Back-end : PHP

- Database : MySQL

- Server : Apache (XAMPP/WAMP/MAMP)

---

## Project Structure

Foss_Hackathon/

│

├── index.html 

├── queue.php    

├── style.css    

├── script.js   

└── README.md             

---

## Database Schema

Database Name: queue_management

Table Name: queue

```
CREATE TABLE `queue` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `queue_number` INT NOT NULL,
  `service_time` VARCHAR(25) NOT NULL
);
```

Note - These column names must match exactly for the application to work.

---

## Local Setup Guide

1. Install Local Server

   Use XAMPP (recommended).
   Start: Apache and MySQL

3. Move Project Files

   Place the project folder into: C:\xampp\htdocs\
   Example: C:\xampp\htdocs\queue-management-system

4. Create the Database
   
   Open: http://localhost/phpmyadmin
   Create database: queue_management
   Run the SQL schema provided above

5. Verify PHP Connection
   
   In queue.php:

      $servername = "localhost";
      $username = "root";
      $password = "";
      $dbname = "queue_management";
   
5. Run the Application
   
   Open :http://localhost/queue-management-system/index.html

---

## Future Enhancements

- Dynamic wait-time prediction
- Login system for staff
- SMS/email notifications
- Analytics dashboard for queue insights
- Real-time updates with AJAX/WebSockets
- Modern responsive UI

---
