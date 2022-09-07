import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { CarEntity } from "../../infra/typeorm/entities/CarEntity";
import { ICarsRepository } from "../contracts/ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Array<CarEntity> = [];

  async create(payload: ICreateCarDTO): Promise<void> {
    const car = new CarEntity();

    Object.assign(car, payload);
    this.cars.push(car);
  }

}