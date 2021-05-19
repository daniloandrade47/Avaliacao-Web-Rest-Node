import { getCustomRepository, Repository } from "typeorm";
import { Client } from "../entities/Client";
import { Order } from "../entities/Order";
import { OrderProduct } from "../entities/OrderProduct";
import { Product } from "../entities/Product";
import { ClientRepository } from "../repositories/ClientRepository";
import { OrderProductRepository } from "../repositories/OrderProductRepository";
import { OrderRepository } from "../repositories/OrderRepository";
import { ProductRepository } from "../repositories/ProductRepository";


class IOrderCreate{
  id: string;
  idClient: string;
  products: Array<Product>;
  quant: number;
}


class OrderService {

  private orderRepository: Repository<Order>;
  private clientRepository: Repository<Client>;
  private productRepository: Repository<Product>;
  private orderProductRepository: Repository<OrderProduct>;

  constructor(){
    this.orderRepository = getCustomRepository(OrderRepository);
    this.orderProductRepository = getCustomRepository(OrderProductRepository);
    this.productRepository = getCustomRepository(ProductRepository);
    this.clientRepository = getCustomRepository(ClientRepository);
  }



  async create({ id, idClient, products, quant}: IOrderCreate){

    const orderAlreadyExists = await this.orderRepository.findOne({
      id
  });

    if (orderAlreadyExists) {
      throw new Error("Order " + id + " already registered!");
    }

    const clientExists = await this.clientRepository.createQueryBuilder()
      .where("id = :idClient", {
        idClient
      })
      .getOne();

      if (!clientExists) {
        throw new Error("Client " + idClient + " already registered!");
      }
  
      if (!products) {
        throw new Error("Product uninformed!");
      }
  
      products.map((product: Product) => {
        if (!product.quant) {
          throw new Error("Product " + product.id + " without informed quantity!");
        }
      });
      
      

    const productsCatalog = await this.productRepository.find();

    let index = -1;
    let valueOrder: number = 0.00;
    let numOrder: number = 0;
    let productCatalog: Product;
    let productUpdate = new Array<Product>();
    let orderProductSave = new Array<OrderProduct>();


    products.map((product: Product) => {

      let orderProduct = new OrderProduct();

      index = productsCatalog.map((e) => { return e.id}).indexOf(product.id);

      productCatalog = productsCatalog[index];

      if (!productCatalog) {
        throw new Error("Product" + product.id + "not already exist in catalog!");
      }

      if (productCatalog.quant <product.quant) {
        throw new Error("Product " + product.id
          + " without quantity available! ("
          + productCatalog.quant + ")");
      }

      productCatalog.quant = productCatalog.quant - product.quant;
      productUpdate.push(productCatalog);

      orderProduct.id = String(String(id) + String(product.id));
      orderProduct.idOrder = String(id);
      orderProduct.idProduct = product.id;
      orderProduct.quant = product.quant;
      orderProduct.value = productCatalog.value;
      orderProductSave.push(orderProduct);

      numOrder += product.quant;
      valueOrder += (productCatalog.value * product.quant);

      valueOrder = (Math.floor(valueOrder * Math.pow(10, 2)) / Math.pow(10, 2));
    });


    const order = this.orderRepository.create({
      id,
      idClient,
      numOrder,
      valueOrder
    });

    await this.orderRepository.save(order);

    productUpdate.map(async (product: Product) => {
      await this.productRepository.save(order);
    });

    orderProductSave.map(async (orderProduct: OrderProduct) => {
      await this.orderProductRepository.save(orderProduct);
    });

    return order;
 }


 async findAll() {

  const listOrder = await this.orderRepository.find({
    relations: ["cliente"]
  });

  return listOrder;
 }
}

export { OrderService }