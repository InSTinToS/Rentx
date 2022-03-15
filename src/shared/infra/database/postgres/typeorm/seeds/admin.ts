import createDBConnection from '../'

import { hash } from 'bcrypt'
import { v4 } from 'uuid'

async function create() {
  const connection = await createDBConnection('localhost')

  const password = await hash('admin', 8)
  const id = v4()

  await connection.query(`
    INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at)
    VALUES ('${id}', 'Miguel', 'admin@rentx.com.br', '${password}', true, '0123456789', NOW())
  `)

  await connection.close()
}

create().then(() => console.log('User admin created'))
