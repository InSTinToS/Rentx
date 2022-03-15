import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1645222074769 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'name', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          { name: 'driver_license', type: 'varchar' },
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'isAdmin', type: 'boolean', default: false },
          { name: 'username', type: 'varchar', isUnique: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
