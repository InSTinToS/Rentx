import { UploadCarImageService } from './UploadCarImageService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

interface IFiles {
  filename: string
}

class UploadCarImageController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const images = req.files as IFiles[]
    const images_name = images.map(file => file.filename)

    const uploadCarImageService = container.resolve(UploadCarImageService)
    await uploadCarImageService.execute({ car_id: id, images_name })
    return res.status(201).send()
  }
}

export { UploadCarImageController }
