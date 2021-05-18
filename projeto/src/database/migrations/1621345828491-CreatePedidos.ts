import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePedidos1621345828491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "order",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "idClient",
                        type: "uuid",
                    },
                    {
                        name: "numOrder",
                        type: "decimal",
                        precision: 6,
                        default: 0
                    },
                    {
                        name: "valueOrder",
                        type: "decimal",
                        precision: 6,
                        default: 0
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ],

                foreignKeys : [
                    {
                        name: "FKCliente",
                        referencedTableName: "clientes",
                        referencedColumnNames: ["id"],
                        columnNames: ["idClient"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("order")
    }

}
