import { getCustomRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";


interface IProductCreate {
  id: string;
  nameProd: string;
  category: string;
  value: number;
}

class ProductService {
  private productRepository : Repository<Product>;

  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  } 

  async create({ id, nameProd, category, value } : IProductCreate){
    
    // Select * from Clientes where fullname = "fullname" limit 1;
    const userAlreadyExists = await this.productRepository.findOne({
      id,
      nameProd,
      category,
      value
    });

    if(userAlreadyExists){
      throw new Error("User already exists");
    }
    
    const productX = this.productRepository.create({
      id,
      nameProd,
      category,
      value
    });

    await this.productRepository.save(productX);    

    return productX;
  }


  async findAll(){
    const list = await this.productRepository.find();

    return list;
  }




  async findByID(id: string){
    const productX = await this.productRepository.findOne({
      id
    });

    if (!productX){
      throw new Error("Product not found!");
    }

    return productX;
  }





  async update({ id, nameProd, category, value}: IProductCreate){
    const productX = await this.productRepository.findOne({
      id
    });

    if (!productX) {
      throw new Error("ID Product not found!");
    }

    productX.nameProd = nameProd;
    productX.category = category;
    productX.value = value;

    await this.productRepository.save(productX);

    const productY = await this.productRepository.findOne({
      id
    });

    return productY;
  }




}

export { ProductService };