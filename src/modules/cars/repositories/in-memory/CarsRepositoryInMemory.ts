import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { CarEntity } from "../../infra/typeorm/entities/CarEntity";
import { ICarsRepository } from "../contracts/ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Array<CarEntity> = [];
  
  async create(payload: ICreateCarDTO): Promise<CarEntity> {
    const car = new CarEntity();
    
    Object.assign(car, payload);
    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<CarEntity> {
    return this.cars.find((car) => car.license_plate === licensePlate);
  }
}