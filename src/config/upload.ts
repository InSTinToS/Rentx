import crypto from 'crypto'
import multer from 'multer'
import { resolve } from 'path'

const tempFolder = resolve(__dirname, '../', 'temp/')

const upload = {
  tempFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (_req, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}

export default upload
