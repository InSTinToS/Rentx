import { CreateCategoryService } from './CreateCategoryService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { description, name } = req.body;
    const createCategoryService = container.resolve(CreateCategoryService);

    await createCategoryService.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateCategoryController };
