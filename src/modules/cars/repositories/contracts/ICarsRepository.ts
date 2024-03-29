import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { CarEntity } from "../../infra/typeorm/entities/CarEntity";

export interface ICarsRepository {
  create(payload: ICreateCarDTO): Promise<CarEntity>;
  findByLicensePlate(license_plate: string): Promise<CarEntity>;
  findAllAvailable(category_id?: string, brand?: string, name?: string): Promise<CarEntity[]>;
  findById(car_id: string): Promise<CarEntity>;
}