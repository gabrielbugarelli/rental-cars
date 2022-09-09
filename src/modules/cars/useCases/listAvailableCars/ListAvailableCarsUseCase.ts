import { inject, injectable } from "tsyringe";
import { CarEntity } from "../../infra/typeorm/entities/CarEntity";
import { ICarsRepository } from "../../repositories/contracts/ICarsRepository";

type Filter = {
  category_id?: string;
  brand?: string;
  name?: string;
};

@injectable()
export class ListAvailableCarsUseCase {
  private carsRepository: ICarsRepository;

  constructor(@inject('CarsRepository') carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute({category_id, brand, name}: Filter): Promise<Array<CarEntity>> {
    const cars = await this.carsRepository.findAllAvailable(category_id, brand, name);
    return cars;
  }
}