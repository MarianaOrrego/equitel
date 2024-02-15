# Equitel Frontend

This is the frontend for the Equitel project. It is built using React. It is a single page application that consumes the Equitel API. It is a work in progress.

## Technologies Used

- React
- React Router
- Axios

## Initial Configuration

To get started with this repository, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo.git
```

2. Install the required dependencies using npm:

```bash
npm install
npm start
```

This will start the development server and open the application in your default browser.

## Login Credentials

The application has a login page. You can use the following credentials to log in:

- Username: `admin`
- Password: `123456`

## Structure

The application is structured as follows:

- `src/` contains the source code for the application
- `src/api` contains the API calls used in the application
- `src/auth` contains the authentication logic used in the application
- `src/components/pages` contains the pages used in the application
- `src/components/styles` contains the styles used in the application
- `src/hooks` contains custom hooks used in the application
- `src/routes` contains the routes used in the application
- `src/utils` contains utility functions used in the application
- `App.tsx` is the entry point for the application
- `index.tsx` is the entry point for the application

## API Documentation

In this file, you look at the API documentation for the Equitel API. We have the following endpoints:

- `/login` - This endpoint is used to log in a user. It takes a username and password and returns a token.
- `/users` - This endpoint is used to get a list of users. 
- `/products` - This endpoint is used to get a list of products.
- `/provider` - This endpoint is used to get a list of providers.
- `/rol` - This endpoint is used to get a list of roles.

In each of these endpoints, we have the following methods:

- `GET` - This method is used to get a list of items.
- `POST` - This method is used to create a new item.
- `PUT` - This method is used to update an item.
- `DELETE` - This method is used to delete an item.

All endpoints have different functions that perform operations like creating, editing, and deleting users, products, and vendors. Make a sale and display information about changes made to products