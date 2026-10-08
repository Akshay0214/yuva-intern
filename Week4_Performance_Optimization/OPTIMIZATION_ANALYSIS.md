# Optimization Analysis

The selected bottleneck is unbounded `GET /api/posts` collection retrieval. The baseline can return every document, making response size and database/application work grow with collection size.

Optimizations: pagination, maximum page size, field projection, Mongoose `lean()`, and an index on `createdAt` for the sort pattern.

Validation requires running identical request counts and concurrency against both versions and recording the supplied metrics. Percentage improvements must be calculated from measured results.
