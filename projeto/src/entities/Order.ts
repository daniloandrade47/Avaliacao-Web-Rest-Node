import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./Client";

@Entity("order")
class Order {

  @PrimaryColumn()
  id: string;

  @JoinColumn({name: "idClient"})
  @ManyToOne(() => Client)
  cliente: Client;
  
  @Column()
  idClient: string;

  @Column()
  numOrder: number;

  @Column()
  valueOrder: number;

  @CreateDateColumn()
  updated_at: Date;

  @UpdateDateColumn()
  created_at: Date;
}

export { Order }