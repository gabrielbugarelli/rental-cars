import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt';

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../respositories/contracts/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

@injectable()
export class CreateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor( @inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(user: ICreateUserDTO): Promise<void> {
    const { name, email, password, driver_license } = user;

    const userAlreadyExist = await this.usersRepository.findByEmail(email);

    if(userAlreadyExist) {
      throw new AppError('User already exists!');
    }

    const passwordHash = await hash(password, 9);

    let userPayload = { 
      name, 
      email, 
      password: passwordHash, 
      driver_license 
    };

    await this.usersRepository.create(userPayload);
  }
}