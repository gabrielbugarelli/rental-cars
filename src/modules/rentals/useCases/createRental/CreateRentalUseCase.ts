import { AppError } from "../../../../errors/AppError";
import { CreateRentalDTO } from "../../dtos/CreateRentalDTO";
import { RentalEntity } from "../../infra/typeorm/entities/RentalEntity";
import { IRentalsRepository } from "../../repositories/contracts/IRentalsRepository";

export class CreateRentalUseCase {
  private rentalsRepository: IRentalsRepository;

  constructor(rentalsRepository: IRentalsRepository) {
    this.rentalsRepository = rentalsRepository;
  }

  async execute(payload: CreateRentalDTO): Promise<RentalEntity> {
    const {car_id, user_id, expected_return_date } = payload;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if(carUnavailable) {
      throw new AppError("Car is unavailable!");
    };

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if(rentalOpenToUser) {
      throw new AppError("There's a rental in progress to user!");
    }

    const rental = await this.rentalsRepository.create(payload);

    return rental;
  }
}