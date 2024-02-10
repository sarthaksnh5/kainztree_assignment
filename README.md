# React Frontend App Documentation

This documentation provides information on the React frontend application built with React for the Django REST API server.

## Folder Structure

The React frontend app consists of two main folders:

1. **Source Folder**
   - Contains the main source code for the application.
   
   - **Auth Folder**
     - Contains components and routes related to user authentication.
     - Includes login and register components.
     
   - **Portal Folder**
     - Contains components and routes related to the main portal of the application.
     - This is where the main functionality of the application resides.

2. **Other Folders (if applicable)**
   - May contain additional folders for components, assets, or configuration files.

## Implementation Details

- **Protected Router**
  - Implemented in `main.jsx`.
  - Ensures that users can only access certain routes if they are logged in.
  - Redirects users to the login page if they attempt to access protected routes without authentication.

## Running the App

To run the React frontend app locally, follow these steps:

1. Clone the repository from GitHub:
    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:
    ```bash
    cd <project_directory>
    ```

3. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

4. Install dependencies:
    ```bash
    npm install
    ```

5. Start the development server:
    ```bash
    npm start
    ```

6. Access the application in your web browser:
    ```
    http://localhost:3000/
    ```

7. Use the login and register components in the Auth folder to authenticate and access protected routes in the Portal folder.

## Additional Notes

- Ensure that the Django server is running locally and accessible at the specified API endpoints before using the React frontend application.

- Modify any configuration files or environment variables as necessary to connect the frontend to the backend server.

