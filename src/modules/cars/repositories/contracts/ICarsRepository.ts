import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";

export interface ICarsRepository {
  create(payload: ICreateCarDTO): Promise<void>;
}