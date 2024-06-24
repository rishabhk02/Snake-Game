# Snake Game

A classic Snake game implemented in JavaScript with additional features including a leaderboard for daily, weekly, and monthly scores, as well as user authentication (login and registration).

## Features

- Classic Snake gameplay
- User authentication (login and register)
- Leaderboard with daily, weekly, and monthly scores

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rishabhk02/Snake-Game.git
2. **Navigate to the Frontend Folder:** 
   ```bash
   cd ./Frontend
3. **Install the required packages:**
   ```bash
   npm install
4. **Start Frontend Server**
   ```bash
   npm start

### Backend Setup
1. **Navigate to Backend Folder:**
   ```bash
   cd ./Backend
2. **Install the required packages:**
   ```bash
   npm install
3. **Create .env file and paste**
   ```bash
   MONGO_URL=<your-mongodb-url>
   JWT_SECRETE_KEY=<your-jwt-secret-key>
   PORT=<your-port-number>
   ```
4. **Start Backend Server:**
   ```bash
   npm run dev

### Project Structure
- Frontend/ - Contains the React frontend application.
- Backend/ - Contains the Node.js backend application.
- .env - Environment variables for the backend.

### Usage
- Open the frontend in your browser:
  ```bash
  http://localhost:3000
- Register or log in to start playing the game.
- Your scores will be recorded and displayed on the leaderboard (daily, weekly, monthly).

