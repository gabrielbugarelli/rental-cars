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

  async findAllAvailable(category_id?: string, brand?: string, name?: string): Promise<CarEntity[]> {
    let availableCars = this.cars.filter((car) => car.available);

    if (!category_id && !brand && !name) return availableCars;

    availableCars = availableCars.filter((car) => {
      if (car.category_id === category_id) return true;
      if (car.brand === brand) return true;
      if (car.name === name) return true;

      return false;
    });

    return availableCars;
  }
}