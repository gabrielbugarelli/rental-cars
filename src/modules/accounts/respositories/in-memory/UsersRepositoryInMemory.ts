import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserEntity } from "../../entities/UserEntity";
import { IUsersRepository } from "../contracts/IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {

  users: UserEntity[] = [];

  async create(payload: ICreateUserDTO): Promise<void> {
    const user = new UserEntity()
    Object.assign(user, { payload });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<UserEntity> {
    return this.users.find(user => user.id === id);
  }
}