import { Entity, PrimaryColumn, Column, CreateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("clientes")
class Client {

  @PrimaryColumn()
  id: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  cel: number;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id){
      this.id = uuid();
    }
  }
}

export { Client }