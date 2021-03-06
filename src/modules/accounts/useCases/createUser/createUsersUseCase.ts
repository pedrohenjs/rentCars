import { ICreateUsersDTO, IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { hash } from 'bcrypt'

export class CreateUsersUseCase {
  constructor (private repository: IUsersRepository) {
    this.repository = repository
  }

  async execute ({ name, username, email, password, driver_license }: ICreateUsersDTO): Promise<void> {
    const userAlreadyExists = await this.repository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists!')
    }
    const passwordHash = await hash(password, 10)
    await this.repository.create({
      name,
      username,
      email,
      password: passwordHash,
      driver_license
    })
  }
}
