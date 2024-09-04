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
