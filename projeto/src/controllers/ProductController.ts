import { Request, Response} from "express";
import { ProductService } from "../services/ProductService";

class ProductController {
  async create(request: Request, response: Response){
    const { nameProd, category, value } = request.body;

    const productService = new ProductService();

    try{
      const productX = await productService.create({ nameProd, category, value });
    
      return response.json(productX);

    }catch(err){
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { ProductController  };