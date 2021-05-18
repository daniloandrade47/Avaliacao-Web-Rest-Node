import { getCustomRepository, Repository } from "typeorm";
import { Client } from "../entities/Client";
import { ClientRepository } from "../repositories/ClientRepository";


interface IClientCreate {
  fullname: string;
  email: string;
  cel: number;
}

class ClientService {
  private clientRepository : Repository<Client>;

  constructor() {
    this.clientRepository = getCustomRepository(ClientRepository);
  } 

  async create({ fullname, email, cel } : IClientCreate){
    
    // Select * from Clientes where fullname = "fullname" limit 1;
    const userAlreadyExists = await this.clientRepository.findOne({
      fullname
    });

    if(userAlreadyExists){
      throw new Error("User already exists");
    }
    
    const clientX = this.clientRepository.create({
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
}


export { ClientService };