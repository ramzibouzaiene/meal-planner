Recipe Finder and Meal Planner

Overview

Recipe Finder and Meal Planner is a full-stack web application that allows users to search for recipes, plan their meals, and manage their dietary preferences efficiently.

Features

🔍 Search Recipes: Find recipes based on ingredients, cuisine, and dietary restrictions.

📅 Meal Planning: Add recipes to meal plans for different days of the week.

✅ Authentication: Secure login and registration system.

🔒 Protected Routes: Certain features require authentication.

🛒 Shopping List: Automatically generate shopping lists from meal plans.

📊 Nutrition Insights: Get detailed nutritional information for each recipe.

Tech Stack

Frontend:

React (TypeScript) – Component-based UI development

React Router – Navigation and protected routes

Tailwind CSS – Styling and responsive design

Context API / Redux – State management

Backend:

Node.js & Express – Server-side logic

MongoDB & Mongoose – Database and ORM

JWT (JSON Web Tokens) – Secure authentication

Bcrypt.js – Password hashing

Installation

Prerequisites

Node.js (>=16)

MongoDB (local or cloud-based)

Setup

Clone the repository

git clone https://github.com/yourusername/recipe-finder-meal-planner.git
cd recipe-finder-meal-planner

Install dependencies

Backend

cd backend
npm install

Frontend

cd ../frontend
npm install

Environment Variables

Create a .env file in the backend folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the application

Backend

npm run dev

Frontend

npm start

API Endpoints

Authentication

POST /api/auth/login - User login

POST /api/auth/register - User registration

Recipes

GET /api/recipes - Get all recipes

GET /api/recipes/:id - Get recipe by ID

Meal Plans

POST /api/mealPlans - Create a meal plan

GET /api/mealPlans - Get all meal plans

PUT /api/mealPlans/:id - Update meal plan

DELETE /api/mealPlans/:id - Delete meal plan

Protected Routes

Some routes require authentication using JWT tokens. The frontend handles this with a protected route component.

Contributing

Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit changes (git commit -m 'Added new feature')

Push to the branch (git push origin feature-name)

Open a pull request

License

This project is licensed under the MIT License - see the LICENSE file for details.
