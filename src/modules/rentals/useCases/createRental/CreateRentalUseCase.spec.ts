import { AppError } from "../../../../errors/AppError";
import { CreateRentalDTO } from "../../dtos/CreateRentalDTO";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let payload: CreateRentalDTO = {
  user_id: 'string',
  car_id: 'string',
  expected_return_date: new Date()
}

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  beforeAll(()=> {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
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
})