# Week 4 – Performance Optimization and Load Testing

This package implements the Week 4 assignment using Node.js, Express.js and MongoDB.

`baseline-version` contains the intentionally less-optimized collection endpoint. `optimized-version` adds pagination, bounded limits, projection, lean reads and indexed sorting. `load-test/load-test.js` provides repeatable concurrent HTTP benchmarking.

Actual performance values are not fabricated; run the benchmark and populate `results/` before submission.
