# API Test Cases

| ID | Endpoint | Scenario | Expected |
|---|---|---|---|
| TC-01 | GET /api/v1/health | Service health check | 200 |
| TC-02 | POST /api/v1/users | Valid user | 201 |
| TC-03 | POST /api/v1/users | Missing name/email | 400 |
| TC-04 | POST /api/v1/users | Duplicate email | 409 |
| TC-05 | GET /api/v1/users | Retrieve users | 200 |
| TC-06 | GET /api/v1/users/:id | Invalid ID | 400 |
| TC-07 | POST /api/v1/posts | Valid post | 201 |
| TC-08 | POST /api/v1/posts | Missing required data | 400 |
| TC-09 | POST /api/v1/posts | Unknown author | 404 |
| TC-10 | GET /api/v1/posts | Retrieve posts | 200 |
| TC-11 | PUT /api/v1/posts/:id | Valid update | 200 |
| TC-12 | DELETE /api/v1/posts/:id | Existing post | 204 |
| TC-13 | POST /api/v1/comments | Valid comment | 201 |
| TC-14 | POST /api/v1/comments | Unknown post | 404 |
| TC-15 | GET /api/v1/comments | Retrieve comments | 200 |
| TC-16 | PUT /api/v1/comments/:id | Valid update | 200 |
| TC-17 | DELETE /api/v1/comments/:id | Existing comment | 204 |
| TC-18 | Unknown route | Invalid endpoint | 404 |

## Manual Postman Workflow

1. Start MongoDB.
2. Start the API.
3. Create a user.
4. Copy the returned user ID.
5. Create a post using that user ID.
6. Copy the returned post ID.
7. Create a comment using the user and post IDs.
8. Retrieve posts and comments.
9. Update the post and comment.
10. Delete the post/comment.
11. Repeat selected requests with invalid data to verify validation and error handling.
