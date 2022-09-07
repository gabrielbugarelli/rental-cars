import { inject, injectable } from "tsyringe";
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

  async execute(car: IRequest): Promise<void> {
    await this.carsRepository.create(car);
  }
}