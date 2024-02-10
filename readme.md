# Django REST API Server Documentation

This documentation provides information on how to run the Django REST API server, which consists of various functionalities including user authentication, profile management, product management, and category management.

## Technologies Used

The Django server utilizes the following libraries:
- Django REST framework
- Django REST framework auth token
- Django REST framework simple JWT

## Account App

The account app handles user authentication and profile management.

### Endpoints

- **Register User**
  - URL: `/account/register/`
  - Method: POST
  - Description: Allows users to register by providing necessary details.

- **User Profile**
  - URL: `/account/profile/<profile_id>/`
  - Method: GET
  - Description: Retrieves user profile information by profile ID.

- **Token Authentication**
  - URL: `/account/token/`
  - Method: POST
  - Description: Generates authentication token for logging in.

- **Token Refresh**
  - URL: `/account/token/refresh/`
  - Method: POST
  - Description: Refreshes authentication token.

- **Change Password**
  - URL: `/account/profile/change_password/`
  - Method: POST
  - Description: Allows users to change their password.

## Product App

The product app manages product information.

### Endpoints

- **Product List and Create**
  - URL: `/product/`
  - Methods: GET (List), POST (Create)
  - Description: Retrieves a list of products or creates a new product.

- **Retrieve, Update, Delete Product**
  - URL: `/product/<product_id>/`
  - Methods: GET (Retrieve), PUT/PATCH (Update), DELETE (Delete)
  - Description: Retrieves, updates, or deletes a specific product by its ID.

## Category App

The category app manages product categories.

### Endpoints

Endpoints for categories mirror those of products, with the same functionalities.

## Running the Project

To run the Django project locally, follow these steps:

1. Clone the repository from GitHub:
    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:
    ```bash
    cd <project_directory>
    ```

3. Install project dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Apply migrations:
    ```bash
    python manage.py migrate
    ```

5. Create a superuser (optional):
    ```bash
    python manage.py createsuperuser
    ```

6. Run the development server:
    ```bash
    python manage.py runserver
    ```

7. Access the API endpoints locally:
    ```
    http://127.0.0.1:8000/
    ```

8. Use appropriate endpoints for different functionalities as described in the documentation.