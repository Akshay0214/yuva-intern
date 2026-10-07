# Week 3 Test Cases

| ID | Endpoint | Test | Expected Status | Purpose |
|---|---|---|---:|---|
| TC-01 | GET /api/v1/health | Health check | 200 | Basic service availability |
| TC-02 | POST /api/v1/users | Empty body | 400 | Validate required fields |
| TC-03 | POST /api/v1/users | Invalid email | 400 | Validate email |
| TC-04 | GET /api/v1/posts/not-a-valid-id | Malformed ID | 400 | Verify BUG-02 fix |
| TC-05 | GET /api/v1/posts/{missingId} | Valid but nonexistent ID | 404 | Verify BUG-03 fix |
| TC-06 | POST /api/v1/comments | Missing fields | 400 | Verify BUG-04 validation |
| TC-07 | POST /api/v1/comments | Invalid author/post ID | 400 | Verify ID validation |
| TC-08 | POST /api/v1/comments | Nonexistent author/post | 404 | Verify relationship checks |
| TC-09 | GET /api/v1/posts?page=1&limit=10 | Paginated list | 200 | Verify bounded query |
| TC-10 | GET /api/v1/comments?page=1&limit=10 | Paginated list | 200 | Verify bounded query |
| TC-11 | GET /api/v1/comments?post=bad-id | Invalid filter | 400 | Verify filter validation |
| TC-12 | GET /api/v1/unknown | Unknown route | 404 | Verify route middleware |

## Automated Test Command

```bash
npm install
npm test
```

The automated suite uses Jest and Supertest and covers the principal regression cases introduced by the debugging exercise.
