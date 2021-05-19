import { Request, Response} from "express";
import { ProductService } from "../services/ProductService";

class ProductController {

  async create(request: Request, response: Response){
    const {id, nameProd, category, value } = request.body;

    const productService = new ProductService();

    try{
      const productX = await productService.create({id, nameProd, category, value });
    
      return response.json(productX);

    }catch(err){
      return response.status(400).json({
        message: err.message,
      });
    }
  }


  async findAll(request: Request, response: Response){
    
    const productService = new ProductService();
    
    const productX = await productService.findAll();

    return response.json(productX);
  }



  async findByID(request: Request, response: Response){
    const { id } = request.params;
    const productService = new ProductService();

    try{
      const productX = await productService.findByID(String(id));

      return response.json(productX);
    }catch (error) {
      return response.status(404).json({
        message:error.message,
      });
    }
  }




  async update(request:Request, response: Response){
    const { id, nameProd, category, value } = request.body;
    const productService = new ProductService();

    try{
      const productX = await productService.update({
        id,
        nameProd,
        category,
        value
      });

      if (productX) {
        return response.status(200).json(productX);
      } else {
        return response.status(404).json({
          message: "Error: Something went wrong"
        });
      }

    } catch (error) {
      return response.status(404).json({
        message: error.message,
      });
    }
  }
  


}

export { ProductController  };