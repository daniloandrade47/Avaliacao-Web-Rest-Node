import { getCustomRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";


interface IProductCreate {
  nameProd: string;
  category: string;
  value: number;
}

class ProductService {
  private productRepository : Repository<Product>;

  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  } 

  async create({ nameProd, category, value } : IProductCreate){
    
    // Select * from Clientes where fullname = "fullname" limit 1;
    const userAlreadyExists = await this.productRepository.findOne({
      nameProd,
      category,
      value
    });

    if(userAlreadyExists){
      throw new Error("User already exists");
    }
    
    const productX = this.productRepository.create({
      nameProd,
      category,
      value
    });

    await this.productRepository.save(productX);    

    return productX;
  }
}

export { ProductService };