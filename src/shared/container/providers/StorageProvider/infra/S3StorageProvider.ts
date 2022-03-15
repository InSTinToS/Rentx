import { IStorageProvider, TDelete, TSave } from '../IStorageProvider'

import upload from '@config/upload'

import { S3 } from 'aws-sdk'
import fs from 'fs'
import mime from 'mime'
import { resolve } from 'path'

class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new S3({ region: process.env.AWS_BUCKET_REGION })
  }

  save: TSave = async (file, folder) => {
    const originalName = resolve(upload.tempFolder, file)
    console.log(originalName)
    const fileContent = await fs.promises.readFile(originalName)

    await this.client
      .putObject({
        Key: file,
        Body: fileContent,
        ACL: 'public-read',
        ContentType: mime.getType(originalName),
        Bucket: `${process.env.AWS_BUCKET}/${folder}`
      })
      .promise()

    await fs.promises.unlink(originalName)

    return file
  }

  delete: TDelete = async (file, folder) => {
    await this.client
      .deleteObject({
        Key: file,
        Bucket: `${process.env.AWS_BUCKET}/${folder}`
      })
      .promise()
  }
}

export { S3StorageProvider }
