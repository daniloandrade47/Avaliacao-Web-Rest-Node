import { Entity, PrimaryColumn, Column, CreateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("produtos")
class Product {

  @PrimaryColumn()
  id: string;

  @Column()
  nameProd: string;

  @Column()
  category: string;

  @Column()
  quant: number;

  @Column()
  value: number;

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

export { Product };