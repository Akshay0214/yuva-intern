const request = require("supertest");
const app = require("../src/app");

describe("Week 3 API regression tests", () => {
  test("health endpoint works", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("missing user fields return 400", async () => {
    const response = await request(app)
      .post("/api/v1/users")
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("ValidationError");
  });

  test("invalid post ID returns 400 instead of crashing", async () => {
    const response = await request(app)
      .get("/api/v1/posts/not-a-valid-id");

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("InvalidId");
  });

  test("unknown route returns JSON 404", async () => {
    const response = await request(app)
      .get("/api/v1/unknown-route");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("NotFound");
  });

  test("missing comment fields return 400", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({ content: "Only content" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("ValidationError");
  });

  test("invalid comment post ID returns 400", async () => {
    const response = await request(app)
      .get("/api/v1/comments?post=invalid-id");

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("InvalidId");
  });
});
