# Blog-Envee

---

A simple blog application built with the MERN stack. Browse from the current selection of blog posts made by other members or share your own. Join in on the discussion of your favorite content.

[Live Demo](https://blog-envee.herokuapp.com/)

## Features

---

- Create an account
- Browse existing blog posts
- Create and publish your own blog posts
- Comment on posts
- Like your favorite posts
- Edit posts with a rich text editor

## Technologies

---

- Express
- React
- MongoDB (mongoose)
- Node.js
- Styled components
- Passport.js
- React-router
- Axios

## Summary

---

The backend is built out using Node.js and the Express framework. The frontend uses React and styled components to create a user-friendly interface. MongoDB Atlas is used for the database working with mongoose. The application is deployed with Heroku. On the backend, the main REST API endpoints are built following the MVC architecture enabling ease of development. API endpoints are secured behind appropriate authentication middlewares. Using passport, authentication is handled using the local and JWT strategies. On the frontend with React, the app is structured cleanly with different pages and components. State management is done primarily through basic useState along with useReducer, usContext, and a custom hook for more complex logics. Authentication and blog services are created for ease of use when interacting with the backend APIs.
