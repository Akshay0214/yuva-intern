# Testing Guide
1. Install Node.js and MongoDB.
2. Configure `.env` from `.env.example`.
3. Install dependencies in the selected version with `npm install`.
4. Start the API with `npm start`.
5. Verify `/health`.
6. Populate a representative set of posts.
7. Run 200 requests at concurrency 20 against the baseline.
8. Save the JSON result.
9. Run the same benchmark against the optimized version.
10. Save the optimized JSON result and calculate before/after metrics.
