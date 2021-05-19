import { Request, Response} from "express";
import { ClientService } from "../services/ClientService";

class ClientController {
  async create(request: Request, response: Response){
    const { id, fullname, email, cel } = request.body;

    const clientService = new ClientService();

    try{
      const clientX = await clientService.create({id, fullname, email, cel });
    
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


  async findByID(request: Request, response: Response){
    const { id } = request.params;
    const clientService = new ClientService();

    try{
      const clientX = await clientService.findByID(String(id));

      return response.json(clientX);
    }catch (error) {
      return response.status(404).json({
        message:error.message,
      });
    }
  }




  async findByEmail(request: Request, response: Response){

    const { email } = request.params;
    const clientService = new ClientService();

    try{
      const clientX = await clientService.findByEmail(email);

      return response.json(clientX);
    } catch (error) {

      return response.status(400).json({
        message:error.message,
      });
    }
  }




  async update(request:Request, response: Response){
    const { id, fullname, email, cel } = request.body;
    const clientService = new ClientService();

    try{
      const clientX = await clientService.update({
        id,
        fullname,
        email,
        cel
      });

      if (clientX) {
        return response.status(200).json(clientX);
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

export { ClientController };