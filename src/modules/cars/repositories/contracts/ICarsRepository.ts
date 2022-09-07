import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { CarEntity } from "../../infra/typeorm/entities/CarEntity";

export interface ICarsRepository {
  create(payload: ICreateCarDTO): Promise<CarEntity>;
  findByLicensePlate(licensePlate: string): Promise<CarEntity>;
}