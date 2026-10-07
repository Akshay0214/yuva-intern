# Postman / cURL Testing Guide

## 1. Health Check

```bash
curl http://localhost:5000/api/v1/health
```

Expected:

```json
{"status":"ok","service":"week3-debug-api"}
```

## 2. Validation Bug

```bash
curl -X POST http://localhost:5000/api/v1/users \
  -H "Content-Type: application/json" \
  -d "{}"
```

Expected status: `400`

## 3. Invalid ID Bug

```bash
curl http://localhost:5000/api/v1/posts/not-a-valid-id
```

Expected status: `400`

## 4. Unknown Route

```bash
curl http://localhost:5000/api/v1/does-not-exist
```

Expected status: `404`

## 5. Pagination

```bash
curl "http://localhost:5000/api/v1/posts?page=1&limit=10"
```

Expected response contains:

- data
- page
- limit
- total
- totalPages

## 6. Invalid Comment Filter

```bash
curl "http://localhost:5000/api/v1/comments?post=invalid-id"
```

Expected status: `400`
