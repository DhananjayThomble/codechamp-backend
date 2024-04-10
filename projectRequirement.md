NodeJs Backend Developer Project

The goal of this project is to develop a robust backend API for an e-learning platform. The API will facilitate user registration, user profile management, course management (including CRUD operations for superadmin), and user enrollment functionalities. Additionally, the courses API will implement filtering and pagination to enhance user experience. The project will utilize the free tier of neon.tech database for data storage and resend.com's free tier for handling email communications.
Project Requirements:
    1. User APIs: 
        ○ User Registration: Allow users to register by providing necessary details such as name, email, and password. Implement validation for email uniqueness and password strength.
        ○ User Profile: Enable users to view and update their profile information, including name, email, profile picture, and any other relevant details.
    2. Course APIs: 
        ○ Get Courses: Provide an API endpoint to fetch courses available on the platform. Implement filtering options based on parameters such as category, level, popularity, etc. Enable pagination to handle large datasets efficiently.
        ○ CRUD Operations for Superadmin: Implement Create, Read, Update, and Delete operations for courses. Only superadmin users should have permission to perform these operations.
    3. User Enrollment APIs: 
        ○ Course Enrollment: Allow users to enroll in courses they are interested in. Implement validation to ensure users can't enroll in the same course multiple times.
        ○ View Enrolled Courses: Provide an API endpoint for users to view the courses they have enrolled in.
    4. Filters and Pagination: 
        ○ Implement filtering options for the courses API to enable users to refine their search based on criteria such as category, level, etc.
        ○ Enable pagination to limit the number of results returned per request and improve performance when dealing with large datasets.
    5. Database and Email Integration: 
        ○ Utilize the free tier of neon.tech database for storing user information, course details, and enrollment data.
        ○ Integrate with resend.com's free tier for handling email communications, such as user registration confirmation, password reset requests, and course enrollment notifications.
    6. Security and Authentication: 
        ○ Implement secure authentication mechanisms, such as JWT (JSON Web Tokens), to authenticate users for accessing protected endpoints.
        ○ Ensure sensitive data, such as passwords, is securely hashed before storage in the database.
    7. Error Handling and Logging: 
        ○ Implement robust error handling mechanisms to provide meaningful error messages to clients.
        ○ Utilize logging to track API requests, responses, and any potential errors or exceptions for debugging purposes.

For Database you can use https://neon.tech/ free tier, and for emails you can use https://resend.com/ free tier plan. For real time profile image upload you can use https://cloudinary.com/ free tier plan.

