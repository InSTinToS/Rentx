import { ImportCategoryService } from './ImportCategoryService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;
    const importCategoryService = container.resolve(ImportCategoryService);

    await importCategoryService.execute(file);

    return res.status(201).send();
  }
}

export { ImportCategoryController };
