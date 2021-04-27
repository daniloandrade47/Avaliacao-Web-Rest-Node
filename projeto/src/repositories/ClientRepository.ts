import { Repository, EntityRepository } from "typeorm";
import { Client } from "../entities/Client";

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {

}

export { ClientRepository };


