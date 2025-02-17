import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.createProductA(
  "Refrigerante",
  10.99
);

const input: InputUpdateProductDto = {
  id: product.id,
  name: product.name,
  price: product.price
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    input.name = "Água"
    input.price = 5

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
