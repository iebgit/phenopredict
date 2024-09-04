# Auth-Service

The `auth-service` is a Django-based microservice that provides user authentication and authorization features using JSON Web Tokens (JWT). This service is part of the **Phenopredict** application and manages user login, registration, and token-based authentication.

## Features

- User Registration
- User Login (with JWT Authentication)
- Token Refresh
- User Logout
- Secure API endpoints using token-based authentication

## Technologies Used

- **Django**: Backend web framework.
- **Django REST Framework (DRF)**: For building RESTful APIs.
- **Simple JWT**: For managing JWT-based authentication.
- **PostgreSQL**: Database.
- **CORS Headers**: To handle cross-origin resource sharing.

## Prerequisites

Make sure you have the following installed on your system:

- Python 3.8 or higher
- PostgreSQL
- pip (Python package installer)
- virtualenv (optional but recommended)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/phenopredict-auth-service.git
cd phenopredict-auth-service/auth-service
```

### 2. Create and Activate Virtual Environment

It is recommended to use a virtual environment to keep your dependencies isolated.

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On macOS/Linux
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

### 3. Install Dependencies

Use `pip` to install the required dependencies.

```bash
pip install -r requirements.txt
```

### 4. Set Up Environment Variables

Create a `.env` file in the root directory of the project and set the following environment variables:

```
SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost 127.0.0.1
DATABASE_URL=postgres://username:password@localhost:5432/auth_service_db
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

- `SECRET_KEY`: A secret key for your Django project.
- `DATABASE_URL`: PostgreSQL database connection URL.
- `CORS_ALLOWED_ORIGINS`: Allowed origins for Cross-Origin Resource Sharing (e.g., frontend application URL).

### 5. Set Up the Database

Ensure that PostgreSQL is running, and then create the database:

```sql
CREATE DATABASE auth_service_db;
```

Then apply migrations to set up the database schema:

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create a Superuser (Optional)

You can create a superuser to access the Django admin panel.

```bash
python manage.py createsuperuser
```

### 7. Run the Development Server

Start the Django development server:

```bash
python manage.py runserver
```

The application will now be running at `http://localhost:8000`.

## API Endpoints

### 1. User Registration

- **URL**: `/auth/register/`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "username": "user123",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `201 Created`: Returns the registered user details.
  - `400 Bad Request`: Invalid data.

### 2. User Login

- **URL**: `/auth/login/`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `200 OK`: Returns JWT tokens (`access` and `refresh`).
  - `400 Bad Request`: Invalid email or password.

### 3. Token Refresh

- **URL**: `/auth/token/refresh/`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "refresh": "your_refresh_token"
  }
  ```
- **Response**:
  - `200 OK`: Returns a new access token.
  - `401 Unauthorized`: Invalid token.

### 4. User Logout

- **URL**: `/auth/logout/`
- **Method**: `POST`
- **Description**: Logs out the user by invalidating the refresh token.

## Running Tests

To run the tests for the `auth-service`:

```bash
python manage.py test
```

## Docker Setup (Optional)

If you want to run the service using Docker, you can use the following steps:

### 1. Build the Docker Image

```bash
docker build -t auth-service .
```

### 2. Run the Docker Container

```bash
docker run -p 8000:8000 --env-file .env auth-service
```

## Deployment

For production deployment, it's recommended to:

- Set `DEBUG = False` in your `.env` file.
- Use a production-ready database (e.g., PostgreSQL on AWS RDS).
- Set up a reverse proxy (e.g., Nginx) and serve Django using a WSGI server like **Gunicorn**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Additional Information

Feel free to modify this **README** file to better fit your project's specific details. The above layout is designed to provide an organized and clear structure for new developers, system administrators, and users working with the `auth-service`. Let me know if you'd like to add or modify any specific sections!
