import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCars1646227577708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          { name: 'name', type: 'varchar' },
          { name: 'brand', type: 'varchar' },
          { name: 'daily_rate', type: 'numeric' },
          { name: 'fine_amount', type: 'numeric' },
          { name: 'description', type: 'varchar' },
          { name: 'license_plate', type: 'varchar' },
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'available', type: 'boolean', default: true },
          { name: 'category_id', type: 'uuid', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ],
        foreignKeys: [
          {
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
            name: 'fk_category_car',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars')
  }
}
