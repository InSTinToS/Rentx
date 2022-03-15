import { CreateSpecificationService } from './createSpecificationService'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description } = req.body;
      const createSpecificationService = container.resolve(
        CreateSpecificationService
      );

      await createSpecificationService.execute({ name, description });

      return res.status(201).send();
    } catch (error) {
      return res.status(500).json({ message: "Specification already exists" });
    }
  }
}

export { CreateSpecificationController };
