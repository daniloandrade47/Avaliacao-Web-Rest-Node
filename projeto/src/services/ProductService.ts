import { getCustomRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";


interface IProductCreate {
  id: string;
  nameProd: string;
  category: string;
  quant: number;
  value: number;
}

class ProductService {
  private productRepository : Repository<Product>;

  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  } 

  async create({ id, nameProd, category, quant, value } : IProductCreate){
    
    // Select * from Clientes where fullname = "fullname" limit 1;
    const userAlreadyExists = await this.productRepository.findOne({
      id,
      nameProd,
      category,
      quant,
      value
    });

    if(userAlreadyExists){
      throw new Error("User already exists");
    }
    
    const productX = this.productRepository.create({
      id,
      nameProd,
      category,
      quant,
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





  async update({ id, nameProd, category, quant, value}: IProductCreate){
    const productX = await this.productRepository.findOne({
      id
    });

    if (!productX) {
      throw new Error("ID Product not found!");
    }

    productX.nameProd = nameProd;
    productX.category = category;
    productX.quant = quant;
    productX.value = value;

    await this.productRepository.save(productX);

    const productY = await this.productRepository.findOne({
      id
    });

    return productY;
  }

}

export { ProductService };