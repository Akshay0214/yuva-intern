# Week 2 Blog API

A RESTful blog backend developed for Week 2 of the Junior Backend Developer internship using Node.js, Express and MongoDB.

## Features

- User registration
- User retrieval
- Blog post CRUD
- Comment CRUD
- MongoDB integration through Mongoose
- Input validation
- Standardized error handling
- Resource relationship validation
- API testing with Postman/cURL
- Basic automated tests with Jest and Supertest

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Jest
- Supertest
- Postman or cURL

## Project Structure

```text
week2-blog-api/
├── src/
│   ├── config/db.js
│   ├── middleware/errorHandler.js
│   ├── models/User.js
│   ├── models/Post.js
│   ├── models/Comment.js
│   ├── routes/users.js
│   ├── routes/posts.js
│   ├── routes/comments.js
│   ├── app.js
│   └── server.js
├── tests/api.test.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Setup

1. Install Node.js and MongoDB.
2. Create a MongoDB database named `week2_blog_api`.
3. Copy `.env.example` to `.env`.
4. Update `MONGODB_URI` if your MongoDB instance uses another connection string.
5. Run:

```bash
npm install
npm start
```

The server starts at `http://localhost:5000`.

For development:

```bash
npm run dev
```

## API Endpoints

### Users

- `POST /api/v1/users`
- `GET /api/v1/users`
- `GET /api/v1/users/:id`

### Posts

- `POST /api/v1/posts`
- `GET /api/v1/posts`
- `GET /api/v1/posts/:id`
- `PUT /api/v1/posts/:id`
- `DELETE /api/v1/posts/:id`

### Comments

- `POST /api/v1/comments`
- `GET /api/v1/comments`
- `GET /api/v1/comments/:id`
- `PUT /api/v1/comments/:id`
- `DELETE /api/v1/comments/:id`

Optional comment filtering:

`GET /api/v1/comments?post=<POST_ID>`

## Example Requests

### Create user

```json
{
  "name": "Akshay Singh",
  "email": "akshay@example.com"
}
```

### Create post

```json
{
  "title": "Introduction to Backend APIs",
  "content": "REST APIs allow clients and servers to communicate using standard HTTP methods.",
  "author": "<USER_ID>"
}
```

### Create comment

```json
{
  "content": "This is a useful post.",
  "author": "<USER_ID>",
  "post": "<POST_ID>"
}
```

## Testing

Run automated tests:

```bash
npm test
```

Manual testing can be performed with Postman or cURL. Test both successful requests and failure cases such as missing required fields, invalid IDs, nonexistent resources, duplicate emails and invalid references.

## Notes

This project is a Week 2 internship implementation based on the assigned blog-platform task. It is intentionally kept focused on the required backend and database functionality. Authentication can be added as a later enhancement if required by the final project scope.
