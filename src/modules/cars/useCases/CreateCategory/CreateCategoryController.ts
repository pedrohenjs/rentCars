import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { Request, Response } from 'express'

class CreateCategoryController {
  private createCategoryUseCase: CreateCategoryUseCase
  constructor (createCategoryUseCase: CreateCategoryUseCase) {
    this.createCategoryUseCase = createCategoryUseCase
  }

  async handle (request: Request, response: Response) {
    const { name, description } = request.body

    await this.createCategoryUseCase.execute({ name, description })
    return response.status(201).send()
  }
}
export { CreateCategoryController }
