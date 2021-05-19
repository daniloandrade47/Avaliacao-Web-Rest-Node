import { Request, Response } from "express";
import { ProductOrderService } from "../services/ProductOrderService";

class OrderProductController {

  async findOrderProduct(request: Request, response: Response) {
    const { idOrder } = request.params;

    const productOrderService = new ProductOrderService();

    const relat = await productOrderService
      .relatProductOrder(String(idOrder));

    return response.json(relat);
  }
}

export { OrderProductController }