const productController = require("../../controller/products");
const productModel = require("../../models/Product");
const httpMocks = require("node-mocks-http");
const newProduct = require("../data/new-product.json");

// mock함수
productModel.create = jest.fn();
productModel.find = jest.fn();
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });
  it("should have a createProduct function", () => {
    // ProductController에 createProduct가 함수인지 파악하는것
    // 예상을 하면서 만드는것
    expect(typeof productController.createProduct).toBe("function");
  });
  it("should call ProductModel.create", async() => {
    // req.body에 newProduct를 넣어준다.
    await productController.createProduct(req, res, next);
    // productController의 createProduct가 실행될때
    // productModel의 create가 호출되는지 확인
    // DB에 직접적인 영향을 받으면 안되기 때문에
    // mock함수인 jest.fn()을 확인한다.
    // expect(productModel.create).toBeCalledWith(req.body);
    expect(productModel.create).toBeCalledWith(newProduct);
  });
  // data를 성공적으로 create시 201 
  it("should return 201 response code", async() => {
      await productController.createProduct(req, res, next);
      expect(res.statusCode).toBe(201);
      expect(res._isEndCalled()).toBeTruthy();
  }); 
  it("should return json body in response", async() => {
    productModel.create.mockReturnValue(newProduct);
      await productController.createProduct(req, res, next);
    // res의 json data가 newProduct와 일치하는지 판단 여부 
      expect(res._getJSONData()).toStrictEqual(newProduct);
  });
  it("should handle errors", async () => {
      const errorMessage = {message: "description property missing"};
      const rejectedPromise = Promise.reject(errorMessage);
      productModel.create.mockReturnValue(rejectedPromise);
      await productController.createProduct(req, res, next);
      expect(next).toBeCalledWith(errorMessage);
  });

  // GET 방식

  describe("Product Controller Get", () => {
    it("should have a getProducts functions", async() => {
      expect(typeof productController.getProduct).toBe("function");
    });
    
    it("should call Product.find({})", async() => {
      await productController.getProduct(req, res, next);
      expect(productModel.find).toHaveBeenCalledWith({});
    });

    it("should return 200 response", async() => {
      await productController.getProduct(req, res, next);
      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
    })

  });



});
