import { Request, Response} from "express";
import { ClientService } from "../services/ClientService";

class ClientController {
  async create(request: Request, response: Response){
    const { fullname, email, cel } = request.body;

    const clientService = new ClientService();

    try{
      const clientX = await clientService.create({ fullname, email, cel });
    
      if (clientX){
        return response.status(201).json(clientX);
      } else {
        return response.status(404).json({
          message: "Algo deu errado!"
        });
      }      

    }catch(err){
      return response.status(400).json({
        message: err.message,
      });
    }
  }
  
  async findAll(request: Request, response: Response){
    
    const clientService = new ClientService();
    
    const clientes = await clientService.findAll();

    return response.json(clientes);
  }
}

export { ClientController };