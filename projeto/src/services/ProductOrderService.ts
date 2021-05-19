import { getCustomRepository, Repository } from "typeorm";
import { OrderProduct } from "../entities/OrderProduct";
import { OrderProductRepository } from "../repositories/OrderProductRepository";


class ProductOrderService {

  private orderProductRepository: Repository<OrderProduct>;

  constructor() {
    this.orderProductRepository = getCustomRepository(OrderProductRepository);
  }

  async relatProductOrder (idOrder: string) {

    const relatX = this.orderProductRepository.find({
      where: { idOrder },
      relations: ["product"]
    });

    return relatX;

  }
}

export { ProductOrderService }