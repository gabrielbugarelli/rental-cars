import { EntityRepository, getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserEntity } from "../../entities/UserEntity";
import { IUsersRepository } from "../contracts/IUsersRepository";

@EntityRepository()
export class UsersRepository implements IUsersRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = getRepository(UserEntity);
  }

  async create(payload: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(payload);
    await this.repository.save(user);
  }
};