const request = require("supertest");
const app = require("../src/app");

describe("Blog API basic tests", () => {
  test("GET /api/v1/health returns service status", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("POST /api/v1/users validates required fields", async () => {
    const response = await request(app)
      .post("/api/v1/users")
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("ValidationError");
  });

  test("Unknown route returns 404", async () => {
    const response = await request(app).get("/api/v1/does-not-exist");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("NotFound");
  });
});
