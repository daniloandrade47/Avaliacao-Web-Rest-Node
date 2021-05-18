import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./Product";

@Entity("pedidoProdutos")
class OrderProduct {

  @PrimaryColumn()
  id: string;

  @Column()
  idOrder: string;

  @JoinColumn({name: "idProduct"})
  @ManyToOne(() => Product)
  produto: Product;

  @Column()
  idProduct: string;

  @Column()
  quant: number;

  @Column()
  value: number;
}

export { OrderProduct }