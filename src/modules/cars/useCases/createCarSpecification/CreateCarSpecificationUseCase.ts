import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { CarEntity } from "../../infra/typeorm/entities/CarEntity";
import { ICarsRepository } from "../../repositories/contracts/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/contracts/ISpecificationsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
};

@injectable()
export class CreateCarSpecificationUseCase {
  private carsRepository: ICarsRepository;
  private specificationsRespository: ISpecificationsRepository

  constructor(
    @inject('CarsRepository') carsRepository: ICarsRepository,
    @inject('SpecificationsRepository') specificationsRespository: ISpecificationsRepository
  ) {
    this.carsRepository = carsRepository;
    this.specificationsRespository = specificationsRespository;
  };

  async execute({car_id, specifications_id}: IRequest): Promise<CarEntity> {
    const carExists = await this.carsRepository.findById(car_id);

    if(!carExists) {
      throw new AppError('Car does not exists!');
    }

    const specifications = await this.specificationsRespository.findByIds(specifications_id);

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  };
}