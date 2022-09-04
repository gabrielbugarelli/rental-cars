import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

export interface IUsersRepository {
  create(payload: ICreateUserDTO): Promise<void>;
}