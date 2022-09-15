import dayjs from "dayjs";
import { AppError } from "../../../../errors/AppError";
import { DayJsDateProvider } from "../../../../shared/containers/providers/DateProvider/implementations/DayJsDateProvider";
import { CreateRentalDTO } from "../../dtos/CreateRentalDTO";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  let payload: CreateRentalDTO = {
    user_id: 'string',
    car_id: 'string',
    expected_return_date: dayAdd24Hours
  }

  beforeAll(()=> {
    dayJsDateProvider = new DayJsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute(payload);
    
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute(payload);
      await createRentalUseCase.execute(payload);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time!', async () => {
    expect(async () => {
      await createRentalUseCase.execute({...payload, expected_return_date: dayjs().toDate()});
    }).rejects.toBeInstanceOf(AppError);
  });
})