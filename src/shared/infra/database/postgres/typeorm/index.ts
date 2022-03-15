import { Connection, createConnection, getConnectionOptions } from 'typeorm'

const createDBConnection = async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database
    })
  )
}

export default createDBConnection
