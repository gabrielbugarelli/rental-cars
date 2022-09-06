import { EntityRepository, getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { UserEntity } from "../entities/UserEntity";
import { IUsersRepository } from "../../../respositories/contracts/IUsersRepository";

@EntityRepository()
export class UsersRepository implements IUsersRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = getRepository(UserEntity);
  }

  async create(payload: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(payload);
    await this.repository.save(user);
  };

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findOne({email});
    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.repository.findOne({id});
    return user;
  }
};