# Bug Tracking Table

| ID | Type | Severity | Problem | Root Cause | Fix | Verification |
|---|---|---|---|---|---|---|
| BUG-01 | Functional | High | User fields not validated | Missing route/schema validation | Add validation rules | Empty user request => 400 |
| BUG-02 | Functional | High | Malformed post ID can throw CastError | No ID validation | Validate ObjectId + error middleware | Invalid ID => 400 |
| BUG-03 | Functional | Medium | Missing post returned 200 | Incorrect not-found handling | Return 404 | Missing resource => 404 |
| BUG-04 | Data Integrity | High | Comment can reference missing records | No relationship checks | Verify author/post | Unknown reference => 404 |
| BUG-05 | Performance | Medium | Posts fetched without limit | Unbounded query | Pagination + projection + lean | Bounded response |
| BUG-06 | Performance | Medium | Comments fetched without limit | Unbounded query | Pagination + projection + lean | Bounded response |
| BUG-07 | API Quality | Medium | Unknown routes inconsistent | No 404 middleware | JSON 404 middleware | Unknown route => 404 |
| BUG-08 | Reliability | High | Errors not centralized | Missing async/error middleware | try/catch + error handler | Controlled JSON errors |
