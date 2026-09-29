# RAG AI Learning App

A full-stack AI-powered learning platform that helps students learn from uploaded documents and online video content. The application uses **Retrieval-Augmented Generation (RAG)** to provide relevant answers and learning assistance based on the available content.

## 🚀 Features

* User authentication and authorization
* Role-based access for Admin, Teacher, and Student
* Teacher can upload learning documents/PDFs
* Students can access course materials and notes
* PDF content processing and text extraction
* RAG-based question answering
* Semantic search using embeddings
* YouTube video content processing
* AI-generated summaries and learning assistance
* Voice-based interaction support
* Secure API authentication using JWT
* MongoDB for application data
* Redis for caching and background processing
* Responsive learning interface

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript / TypeScript
* HTML5
* CSS3
* Axios

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication
* MongoDB
* Redis

### AI / RAG

* Large Language Model (LLM)
* Embeddings
* Vector Database / Vector Search
* Retrieval-Augmented Generation (RAG)
* PDF document processing
* YouTube content processing
* Speech-to-Text / Text-to-Speech

## 🏗️ Project Architecture

```text
User
  |
  v
React Frontend
  |
  v
Node.js / Express Backend
  |
  +------------------+
  |                  |
  v                  v
MongoDB             Redis
  |
  v
Document / Course Data
  |
  v
RAG Pipeline
  |
  +------------------+
  |                  |
  v                  v
Embeddings       Vector Search
  |                  |
  +--------+---------+
           |
           v
          LLM
           |
           v
      AI Response
```

## 🔄 RAG Workflow

The application follows a retrieval-based approach instead of sending an entire document directly to the LLM.

```text
PDF / Video Content
        |
        v
   Text Extraction
        |
        v
     Chunking
        |
        v
    Embeddings
        |
        v
   Vector Storage
        |
        v
    User Question
        |
        v
 Semantic Retrieval
        |
        v
 Relevant Context
        |
        v
       LLM
        |
        v
    Final Answer
```

## 👥 User Roles

### Admin

* Manage users
* Manage learning content
* Manage platform-level data

### Teacher

* Upload learning material
* Create and manage courses
* Provide notes and educational content

### Student

* Access courses
* Read learning material
* Ask questions
* Get AI-assisted answers and summaries

## 🔐 Authentication

The application uses JWT-based authentication.

Authentication flow:

```text
Login
  |
  v
Backend Authentication
  |
  v
JWT Token
  |
  v
Client Storage
  |
  v
Authenticated API Requests
```

Protected APIs validate the token before allowing access to restricted resources.

## 📂 Project Structure

```text
LearninApp/
│
├── backend/
│   ├── Controller/
│   ├── Model/
│   ├── Route/
│   ├── Middleware/
│   └── ...
│
├── Voice_Analysis/
├── roadmap_ai/
├── utubevedioAi/
├── voice_to_to/
├── uploads/
│
├── index.js
├── server.js
├── server.ts
├── socketio.js
├── package.json
├── package-lock.json
└── .gitignore
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/AMISHAMALVIYA/Rag_AI.git
```

### 2. Go to the project

```bash
cd Rag_AI
```

### 3. Install dependencies

```bash
npm install
```

If the backend has its own `package.json`, install its dependencies as well:

```bash
cd backend
npm install
```

## 🔑 Environment Variables

Create a `.env` file in the required project directory.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

REDIS_URL=your_redis_connection_string

LLM_API_KEY=your_llm_api_key
```

**Never commit your `.env` file or API keys to GitHub.**

The repository includes `.gitignore` rules for sensitive files.

## ▶️ Run the Application

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

Start the frontend according to the frontend project's configuration.

## 📡 API Overview

Example API modules include:

```text
Authentication
    POST /login
    POST /register

Courses
    GET /courses
    POST /courses

Documents
    POST /upload
    GET /documents

AI / RAG
    POST /ask
    POST /summary
```

Actual routes may vary depending on the current implementation.

## 🔒 Security

The application follows basic security practices including:

* JWT-based authentication
* Role-based authorization
* Environment variables for secrets
* Password protection
* Protected API routes
* `.gitignore` for sensitive configuration
* Validation of API requests

## 📈 Future Improvements

* Improved vector database integration
* Better document processing pipeline
* Advanced semantic search
* AI-generated personalized learning paths
* Improved voice interaction
* Course progress tracking
* Notifications
* Cloud deployment
* Monitoring and analytics

## 👩‍💻 Author

**Amisha Malviya**

Software Engineer | Full Stack Developer

### Technologies

`React.js` `Next.js` `Node.js` `Express.js` `MongoDB` `MySQL` `Redis` `AWS` `RAG` `LLM` `JavaScript` `TypeScript`

## 📄 License

This project is developed for learning, experimentation, and portfolio purposes.
