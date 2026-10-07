# Week 2 Internship Report
## Backend API Development and Database Integration

### 1. Objective

The objective of Week 2 was to move from API planning to practical backend implementation by developing a functional blog API using Node.js, Express.js and MongoDB. The implementation focuses on user registration, blog post management and comment functionality. MongoDB was used as the database and Mongoose was used to define schemas and communicate with the database.

### 2. Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime for server-side development |
| Express.js | REST API and routing framework |
| MongoDB | NoSQL database for persistent application data |
| Mongoose | MongoDB object modeling and validation |
| Jest | Automated testing |
| Supertest | HTTP/API testing |
| Postman/cURL | Manual endpoint testing |

### 3. Backend Architecture

The application follows a modular structure. `server.js` is responsible for loading environment variables, establishing the MongoDB connection and starting the server. `app.js` configures Express middleware and routes. Models define the database schema, route modules implement endpoint behavior, and the error-handling middleware provides consistent API error responses.

### 4. Database Design

The database contains three primary collections:

**Users**
- name
- email
- createdAt
- updatedAt

**Posts**
- title
- content
- author
- createdAt
- updatedAt

**Comments**
- content
- author
- post
- createdAt
- updatedAt

The `author` field in posts and comments references the Users collection. The `post` field in comments references the Posts collection. Mongoose population is used when returning related information.

### 5. Implemented API

#### User APIs

- `POST /api/v1/users` creates a user.
- `GET /api/v1/users` returns all users.
- `GET /api/v1/users/:id` returns a specific user.

#### Post APIs

- `POST /api/v1/posts` creates a post.
- `GET /api/v1/posts` returns all posts.
- `GET /api/v1/posts/:id` returns one post.
- `PUT /api/v1/posts/:id` updates a post.
- `DELETE /api/v1/posts/:id` deletes a post.

#### Comment APIs

- `POST /api/v1/comments` creates a comment.
- `GET /api/v1/comments` returns comments.
- `GET /api/v1/comments/:id` returns one comment.
- `PUT /api/v1/comments/:id` updates a comment.
- `DELETE /api/v1/comments/:id` deletes a comment.

### 6. Validation and Error Handling

Required fields are checked before database operations. Mongoose schema validation provides additional constraints for strings and email format. The application checks whether referenced users and posts exist before creating related resources. Invalid MongoDB IDs are handled separately. Duplicate values such as an existing unique email return a conflict response. Unknown routes return 404 responses, while unexpected server errors return a standardized 500 response.

### 7. Testing

The project includes basic automated tests using Jest and Supertest. The test suite verifies the health endpoint, required-field validation and handling of unknown routes. A manual Postman/cURL test plan is also included for full CRUD testing of users, posts and comments.

### 8. Setup and Execution

1. Install Node.js and MongoDB.
2. Create a `.env` file from `.env.example`.
3. Configure `MONGODB_URI`.
4. Run `npm install`.
5. Start the server using `npm start`.
6. Use Postman or cURL to test the endpoints.
7. Run `npm test` for automated tests.

### 9. Outcome

The Week 2 implementation converts the API concepts from the design stage into a working backend structure. It demonstrates server setup, REST routing, MongoDB integration, schema validation, CRUD operations, relationship checks, error handling and API testing. The modular project structure also provides a foundation for adding authentication, authorization and additional production-level features in later development stages.

### 10. Suggested Screenshots for Final Submission

Add actual screenshots from your environment for:
1. Project folder structure in VS Code.
2. MongoDB database/collections.
3. Server running in terminal.
4. POST user request in Postman.
5. POST post request in Postman.
6. GET posts response.
7. POST comment request.
8. PUT/DELETE operation.
9. Error/validation response.
10. Automated test output.
