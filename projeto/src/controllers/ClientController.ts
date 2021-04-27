import { Request, Response} from "express";
import { getCustomRepository } from "typeorm";
import { ClientRepository } from "../repositories/ClientRepository";

class ClientController {

  async create(request: Request, response: Response){
    const {fullname, email, cel } = request.body;
    const clientrepository = getCustomRepository (ClientRepository);
  
    const clientX = clientrepository.create({
      fullname,
      email,
      cel,
    });
  
    await clientrepository.save(clientX);
  
    return response.json(clientX);
  }
}

export { ClientController };