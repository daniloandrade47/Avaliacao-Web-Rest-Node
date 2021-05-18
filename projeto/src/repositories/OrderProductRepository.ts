import { EntityRepository, Repository } from "typeorm";
import { OrderProduct } from "../entities/OrderProduct";

@EntityRepository(OrderProduct)
class OrderProductRepository extends Repository<OrderProduct>{

}

export { OrderProductRepository }