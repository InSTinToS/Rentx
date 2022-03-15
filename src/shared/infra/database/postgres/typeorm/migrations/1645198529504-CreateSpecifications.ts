import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSpecifications1645198529504 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications",
        columns: [
          { name: "name", type: "varchar" },
          { name: "description", type: "varchar" },
          { name: "id", type: "uuid", isPrimary: true },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("specifications");
  }
}
