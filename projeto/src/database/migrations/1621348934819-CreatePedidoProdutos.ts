import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePedidoProdutos1621348934819 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pedidoProdutos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "idOrder",
                        type: "uuid"
                    },
                    {
                        name: "idProduct",
                        type: "uuid"
                    },
                    {
                        name: "quant",
                        type: "number",
                        default: 0
                    },
                    {
                        name: "value",
                        type: "decimal",
                        precision: 6,
                        default: 0
                    }                    
                ],

                foreignKeys: [
                    {
                        name: "FKPedido",
                        referencedTableName: "order",
                        referencedColumnNames: ["id"],
                        columnNames: ["idOrder"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKProduto",
                        referencedTableName: "produtos",
                        referencedColumnNames: ["id"],
                        columnNames: ["idProduct"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pedidoProdutos");
    }
}
