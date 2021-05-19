import { Request, Response} from "express"
import { OrderService } from "../services/OrderService";


class OrderController {
  
  async create(request:Request, response:Response){

    const { id, idClient, products, quant } = request.body;
    const orderService = new OrderService();


    try{

      const orderX = await orderService.create({
        id,
        idClient,
        products,
        quant
      });

      if (orderX) {
        return response.status(201).json(orderX);
      } else {
        return response.status(404).json({
          message: "Something went wrong!"
        });
      }

    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }


  async findAll(request: Request, response: Response){
    const orderService = new OrderService();

    const listOrder = await orderService.findAll();

    return response.json(listOrder);
  }
}

export { OrderController }