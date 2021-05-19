import { getCustomRepository, Repository } from "typeorm";
import { Client } from "../entities/Client";
import { ClientRepository } from "../repositories/ClientRepository";


interface IClientCreate {
  id: string;
  fullname: string;
  email: string;
  cel: number;
}

class ClientService {
  
  private clientRepository : Repository<Client>;

  constructor() {
    this.clientRepository = getCustomRepository(ClientRepository);
  } 



  async create({id, fullname, email, cel }: IClientCreate){
    
    // Select * from Clientes where fullname = "fullname" limit 1;
    const userAlreadyExists = await this.clientRepository.findOne({
      fullname
    });

    if(userAlreadyExists){
      throw new Error("User already exists");
    }


    const IdAlreadyExists = await this.clientRepository.findOne({
      id
    });
    

    if(IdAlreadyExists){
      throw new Error("User already exists");
    }

    
    const clientX = this.clientRepository.create({
      id,
      fullname,
      email,
      cel,
    });

    await this.clientRepository.save(clientX);    

    return clientX;
  }



  async findAll(){
    const list = await this.clientRepository.find();

    return list;
  }


  async findByID(id: string) {
    const clientX = await this.clientRepository.findOne({
      id
    });
  
    if (!clientX){
      throw new Error("Client not exists!");
    }
    return clientX;
  }



  async findByEmail(email: string) {
    const clientX = await this.clientRepository.findOne({
      email
    });

    if (!clientX){
      throw new Error("Client not exists!");
    }
    return clientX;
  }



  async update({ id, fullname, email, cel}: IClientCreate){
    const clientX = await this.clientRepository.findOne({
      id
    });

    if (!clientX) {
      throw new Error("ID Cliente não encontrado");
    }

    clientX.fullname = fullname;
    clientX.email = email;
    clientX.cel = cel;

    await this.clientRepository.save(clientX);

    const clientY = await this.clientRepository.findOne({
      id
    });

    return clientY;
  }



  






}



export { ClientService };