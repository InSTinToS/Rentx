import { IStorageProvider, TDelete, TSave } from '../IStorageProvider'

import { AppError } from '@shared/errors/AppError'

import upload from '@config/upload'

import fs from 'fs'
import { resolve } from 'path'

class LocalStorageProvider implements IStorageProvider {
  save: TSave = async (file, folder) => {
    await fs.promises.rename(
      resolve(upload.tempFolder, file),
      resolve(`${upload.tempFolder}/${folder}`, file)
    )

    return file
  }
  delete: TDelete = async (file, folder) => {
    const fileName = resolve(`${upload.tempFolder}/${folder}`, file)

    try {
      await fs.promises.stat(fileName)
      await fs.promises.unlink(fileName)
    } catch (error) {
      throw new AppError('Failed to delete file')
    }
  }
}

export { LocalStorageProvider }
