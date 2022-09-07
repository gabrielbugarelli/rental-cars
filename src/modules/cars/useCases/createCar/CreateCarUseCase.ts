import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { CarEntity } from "../../infra/typeorm/entities/CarEntity";
import { ICarsRepository } from "../../repositories/contracts/ICarsRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
export class CreateCarUseCase {
  private carsRepository: ICarsRepository;

  constructor(@inject('CarsRepository') carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute(car: IRequest): Promise<CarEntity> {
    const carAlreadExists = await this.carsRepository.findByLicensePlate(car.license_plate);

    if(carAlreadExists) {
      throw new AppError('Car already exists!');
    }

    return await this.carsRepository.create(car);
  }
}