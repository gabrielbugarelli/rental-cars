import { AppError } from "../../../../errors/AppError";
import { IRentalsRepository } from "../../repositories/contracts/IRentalsRepository";

type PayloadRequest = {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

export class CreateRentalUseCase {
  private rentalsRepository: IRentalsRepository;

  constructor(rentalsRepository: IRentalsRepository) {
    this.rentalsRepository = rentalsRepository;
  }

  async execute(payload: PayloadRequest): Promise<void> {
    const {car_id, user_id, expected_return_date } = payload;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if(carUnavailable) {
      throw new AppError("Car is unavailable!");
    };

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if(rentalOpenToUser) {
      throw new AppError("There's a rental in progress to user!");
    }
  }
}