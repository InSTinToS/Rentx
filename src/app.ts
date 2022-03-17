import 'dotenv/config'
import '@shared/container'
import 'reflect-metadata'

import createDBConnection from '@shared/infra/database/postgres/typeorm'
import { AppError } from '@shared/errors/AppError'
import { routes } from '@shared/infra/http/express/routes'
import rateLimiter from '@shared/infra/http/express/middlewares/rateLimiter'

import swaggerFile from '@docs/swagger.json'

import upload from '@config/upload'

import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import express, { NextFunction, Request, Response } from 'express'
import swagger from 'swagger-ui-express'

createDBConnection()

export const app = express()

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app })
  ],
  tracesSampleRate: 1.0
})

app.use(Sentry.Handlers.requestHandler())

app.use(Sentry.Handlers.tracingHandler())

app.use(express.json())

app.use(rateLimiter)

app.use('/avatar', express.static(`${upload.tempFolder}/avatar`))

app.use('/cars', express.static(`${upload.tempFolder}/cars`))

app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile))

app.use(routes)

app.use(Sentry.Handlers.errorHandler())

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) =>
  error instanceof AppError
    ? res.status(error.statusCode).json({ message: error.message })
    : res.status(500).json({ message: 'Internal server error - ' + error })
)
