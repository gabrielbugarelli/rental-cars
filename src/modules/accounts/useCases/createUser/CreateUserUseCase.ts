import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../respositories/contracts/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor( @inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(user: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create(user);
  }
}