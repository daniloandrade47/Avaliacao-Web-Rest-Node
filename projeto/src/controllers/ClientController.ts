import { Request, Response} from "express";
import { ClientService } from "../services/ClientService";

class ClientController {
  async create(request: Request, response: Response){
    const { fullname, email, cel } = request.body;

    const clientService = new ClientService();

    try{
      const clientX = await clientService.create({ fullname, email, cel });
    
      return response.json(clientX);

    }catch(err){
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}

export { ClientController };