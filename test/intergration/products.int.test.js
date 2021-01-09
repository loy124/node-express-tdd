const request = require("supertest");
const app = require("../../server");
const newProduct = require("../data/new-product.json");

it("POST /api/products", async () => {
  const response = await request(app).post("/api/products").send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});
// 에러 대응
it("should return 500 on POST /api/products", async () => {
  const response = await request(app)
    .post("/api/products")
    .send({ name: "description 제외" });

  expect(response.statusCode).toBe(500);
//   console.log(response.body);
  expect(response.body).toStrictEqual({
    message: "Product validation failed: description: Path `description` is required.",
  });
});
