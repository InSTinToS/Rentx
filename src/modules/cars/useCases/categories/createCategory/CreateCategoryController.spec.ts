import { app } from '../../../../../app'

import createDBConnection from '@shared/infra/database/postgres/typeorm'

import { hash } from 'bcrypt'
import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 } from 'uuid'

let connection: Connection

const admin = {
  email: 'admin@rentx.com.br',
  password: 'admin'
}

jest.setTimeout(60000)

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createDBConnection()
    await connection.runMigrations()
    const password = await hash(admin.password, 8)
    const id = v4()
    await connection.query(`
      INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at)
      VALUES ('${id}', 'Miguel', '${admin.email}', '${password}', true, '0123456789', NOW())
    `)
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send(admin)

    const { refresh_token } = responseToken.body

    const reqData = {
      name: 'Category supertest',
      description: 'Category desc supertest'
    }

    const res = await request(app)
      .post('/categories')
      .send(reqData)
      .set({ Authorization: `Bearer ${refresh_token}` })

    expect(res.status).toBe(201)
  })
})
