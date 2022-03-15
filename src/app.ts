import 'dotenv/config'
import '@shared/container'
import 'reflect-metadata'

import createDBConnection from '@shared/infra/database/postgres/typeorm'
import { AppError } from '@shared/errors/AppError'
import { routes } from '@shared/infra/http/express/routes'

import swaggerFile from '@docs/swagger.json'

import upload from '@config/upload'

import express, { NextFunction, Request, Response } from 'express'
import swagger from 'swagger-ui-express'

export const app = express()

createDBConnection()

app.use(express.json())

app.use('/avatar', express.static(`${upload.tempFolder}/avatar`))
app.use('/cars', express.static(`${upload.tempFolder}/cars`))

app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile))

app.use(routes)

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) =>
  error instanceof AppError
    ? res.status(error.statusCode).json({ message: error.message })
    : res.status(500).json({ message: 'Internal server error - ' + error })
)
