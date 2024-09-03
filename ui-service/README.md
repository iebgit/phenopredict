# **User Interface Service**

Welcome to the User Interface (UI) Service of **PhenoPredict**. This service is built using React.js and serves as the primary interaction point for users. It allows users to upload genetic data or images, view predictions related to appearance, behavior, ancestry, and health, and manage their profiles.

## **Table of Contents**

1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Application](#running-the-application)
4. [Project Structure](#project-structure)
5. [Environment Variables](#environment-variables)
6. [Contributing](#contributing)
7. [License](#license)

## **Overview**

The User Interface Service is a React.js application that provides a user-friendly interface for interacting with **[App Name]**. Users can:

- Upload genetic data files (e.g., VCF, CSV) and images (e.g., JPEG, PNG).
- Receive and view detailed predictions regarding their appearance, behavior, ancestry, and potential health risks.
- Manage their accounts, including login, registration, and data management.

This service communicates with backend microservices via an API Gateway to fetch and display data.

## **Features**

- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Data Upload**: Support for genetic data and image uploads.
- **Results Visualization**: Interactive visualizations of predictions, including charts, graphs, and generated images.
- **User Dashboard**: Overview of user activities, recent uploads, and analysis results.
- **Responsive Design**: Mobile-friendly interface using Material-UI for consistent design.

## **Getting Started**

### **Prerequisites**

Before you begin, ensure you have met the following requirements:

- **Node.js**: v12.x or later
- **npm**: v6.x or later
- **Git**: Installed for version control

### **Installation**

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/iebgit/ui-service.git
   cd ui-service
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

### **Running the Application**

1. **Start the Development Server**:

   ```bash
   npm start
   ```

   The app should now be running on `http://localhost:3000`.

2. **Build for Production**:

   To create an optimized production build:

   ```bash
   npm run build
   ```

   The production-ready files will be in the `build/` directory.

## **Project Structure**

```
ui-service/
├── public/                     # Public assets (favicon, index.html)
├── src/
│   ├── assets/                 # Static assets (images, fonts)
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Page components (Home, Login, Dashboard)
│   ├── redux/                  # Redux slices and store configuration
│   ├── services/               # API service functions
│   ├── styles/                 # Global styles and themes
│   ├── App.js                  # Main app component
│   ├── index.js                # Entry point
│   └── routes/                 # Route configuration
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── package.json                # Node.js dependencies and scripts
└── README.md                   # Project documentation
```

## **Environment Variables**

The application requires specific environment variables to be configured. Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_BASE_URL=<API Gateway Base URL>
REACT_APP_AUTH_SERVICE_URL=<Authentication Service URL>
```

Replace `<API Gateway Base URL>` and `<Authentication Service URL>` with the actual URLs for your backend services.

## **Contributing**

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add YourFeature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Create a Pull Request.

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.
