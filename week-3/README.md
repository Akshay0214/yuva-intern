# Week 3 - Debugging, Testing and Error Resolution

This project simulates a backend codebase containing intentional functional and performance issues. The `buggy-version` directory contains the flawed implementation. The `fixed-version` directory contains the corrected implementation and regression tests.

## Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Jest
- Supertest

## Run the Fixed Version

```bash
cd fixed-version
npm install
```

Create `.env` from `.env.example` and configure MongoDB.

```bash
npm start
```

Run tests:

```bash
npm test
```

## Compare the Versions

Use `buggy-version` first to reproduce the documented problems, then run the equivalent requests against `fixed-version`.

## Important

The numerical performance improvement should be measured in the student's own local environment. This project does not invent benchmark numbers. Capture actual before/after measurements if your internship evaluator requires them.

## Suggested Evidence Screenshots

1. Buggy project in VS Code.
2. Failing request/response showing a bug.
3. Buggy source code around the issue.
4. Fixed source code.
5. Successful request after the fix.
6. Postman collection/test results.
7. `npm test` output.
8. MongoDB collections.
9. Pagination response.
10. Final project structure.
