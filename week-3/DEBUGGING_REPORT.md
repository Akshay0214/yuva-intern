# Week 3 Internship Report
## Debugging, Testing, and Error Resolution

### 1. Objective

The objective of Week 3 was to enhance practical debugging and testing skills by analyzing a self-contained backend API containing intentionally introduced functional issues and performance bottlenecks. The project was replicated using the same backend stack as Week 2: Node.js, Express.js and MongoDB. The debugging process involved static code inspection, API testing, identifying root causes, applying fixes, and writing regression tests.

### 2. Development Environment

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB
- ODM: Mongoose
- Testing: Jest and Supertest
- Manual API testing: Postman/cURL
- Editor: VS Code or equivalent

### 3. Debugging Methodology

The debugging process followed these stages:

1. Inspect the source code and project structure.
2. Identify areas where input validation and error handling were missing.
3. Execute API requests representing valid and invalid scenarios.
4. Observe response status codes and error behavior.
5. Trace the request through the route handler and database operation.
6. Identify the root cause of each issue.
7. Implement a targeted fix.
8. Re-run the failing scenario.
9. Add a regression test to prevent the issue from returning.
10. Review database query behavior and collection endpoints for performance concerns.

### 4. Bugs Identified and Resolved

#### BUG-01: Missing User Input Validation
**Category:** Functional  
**Severity:** High

**Observed behavior:** The buggy user endpoint directly passed `req.body` to `User.create()`. Requests without required fields could therefore reach the database without an explicit API-level validation response.

**Root cause:** No required-field validation existed in the route and the original schema had no required constraints.

**Resolution:** Added explicit checks for `name` and `email`, and strengthened the Mongoose schema with required fields and email validation.

**Verification:** Sending an empty JSON body now returns HTTP 400 with a `ValidationError`.

---

#### BUG-02: Invalid Post IDs Could Produce Uncontrolled Errors
**Category:** Functional  
**Severity:** High

**Observed behavior:** `findById()` could throw a Mongoose `CastError` when a malformed ID was supplied. The buggy application did not provide controlled error handling.

**Root cause:** The route did not validate the ID before querying MongoDB.

**Resolution:** Added `mongoose.isValidObjectId()` before database access and return HTTP 400 for malformed IDs. A centralized error handler was also added for database errors.

**Verification:** `GET /api/v1/posts/not-a-valid-id` now returns HTTP 400 with a structured JSON error.

---

#### BUG-03: Missing Resources Returned Incorrect Status
**Category:** Functional  
**Severity:** Medium

**Observed behavior:** When a post did not exist, the buggy endpoint returned HTTP 200 with an empty object.

**Root cause:** The route did not distinguish between successful retrieval and missing resources.

**Resolution:** Return HTTP 404 with a `NotFound` response when the post is absent.

**Verification:** Requesting a valid-format but nonexistent post ID now returns 404.

---

#### BUG-04: Comments Could Reference Nonexistent Resources
**Category:** Functional/Data Integrity  
**Severity:** High

**Observed behavior:** The buggy comment endpoint accepted author and post IDs without verifying that the referenced documents existed.

**Root cause:** No reference validation was performed before creating a comment.

**Resolution:** Validate ObjectIds and use existence checks for both the author and post before inserting the comment.

**Verification:** A comment referencing an unknown author or post now returns HTTP 404 instead of creating invalid relational data.

---

#### BUG-05: Unbounded Post Query
**Category:** Performance  
**Severity:** Medium

**Observed behavior:** `GET /api/v1/posts` fetched the entire collection with no pagination or field restriction.

**Root cause:** The collection endpoint had no page/limit mechanism and returned all selected data.

**Resolution:** Added pagination with `page` and `limit`, capped the maximum page size at 50, selected only required fields, used `lean()` for read-only results, and added a count query.

**Verification:** The endpoint now returns a bounded result set and pagination metadata.

---

#### BUG-06: Unbounded Comment Query
**Category:** Performance  
**Severity:** Medium

**Observed behavior:** The comment collection endpoint returned every matching document without pagination.

**Root cause:** No pagination or bounded query behavior was implemented.

**Resolution:** Added pagination, a maximum page size, field selection, validation of the optional post filter, and `lean()` for read operations.

**Verification:** Large collections are now returned in bounded pages.

---

#### BUG-07: No Consistent Unknown-Route Handling
**Category:** Functional/API Quality  
**Severity:** Medium

**Observed behavior:** Requests to undefined API paths used Express's default behavior rather than the API's JSON error format.

**Root cause:** No application-level 404 middleware existed.

**Resolution:** Added a final middleware that returns a structured JSON 404 response.

**Verification:** Unknown API paths now consistently return JSON and HTTP 404.

---

#### BUG-08: Missing Centralized Error Handling
**Category:** Reliability  
**Severity:** High

**Observed behavior:** Route-level database errors were not consistently passed to a central error handler.

**Root cause:** The buggy routes lacked `try/catch` and `next(err)` patterns and no final error middleware was present.

**Resolution:** Added controlled async handling to routes and a centralized error middleware for validation, duplicate-key, cast and unexpected errors.

**Verification:** Database and validation errors now produce controlled API responses instead of uncontrolled failures.

### 5. Before and After Summary

| Area | Before Fix | After Fix |
|---|---|---|
| Input validation | Inconsistent | Explicit + schema validation |
| Invalid IDs | Uncontrolled CastError risk | 400 InvalidId |
| Missing post | 200 empty object | 404 NotFound |
| Comment references | Not checked | Author/post existence verified |
| Posts query | Entire collection | Paginated, bounded |
| Comments query | Entire collection | Paginated, bounded |
| Unknown routes | Default response | JSON 404 |
| Error handling | Distributed/incomplete | Centralized |
| Tests | No regression suite | Jest/Supertest tests |

### 6. Testing Strategy

The fixed project contains regression tests for:

- Health endpoint
- Required-field validation
- Invalid post IDs
- Unknown routes
- Missing comment fields
- Invalid comment filter IDs

Manual testing should additionally cover successful CRUD operations, duplicate user emails, nonexistent authors/posts, pagination, and valid/invalid request bodies.

### 7. Expected Verification Results

The following tests are expected to pass after installing dependencies and configuring the database:

- Health check returns 200.
- Missing user fields return 400.
- Invalid post IDs return 400.
- Unknown routes return 404.
- Missing comment fields return 400.
- Invalid comment filter IDs return 400.

### 8. Performance Improvement Approach

The Week 3 performance fixes focus on preventing uncontrolled reads rather than claiming a fabricated percentage improvement. Pagination limits the amount of data returned per request. Field projection reduces unnecessary data transfer. `lean()` avoids the overhead of full Mongoose documents for read-only operations. The comment filter is validated before execution, and collection counts are separated from page retrieval.

### 9. Conclusion

The Week 3 task demonstrates a systematic backend debugging workflow. The intentionally flawed implementation was reviewed through static inspection and API scenarios, the root causes were identified, targeted fixes were applied, and regression tests were added. The resulting version improves validation, data integrity, error handling, API consistency and query behavior. The exercise also demonstrates why testing should accompany bug fixes so that previously resolved issues can be detected automatically if future code changes reintroduce them.
