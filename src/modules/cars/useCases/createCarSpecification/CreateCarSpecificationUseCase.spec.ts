import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let car = {
  name: 'Cadilac',
  brand: 'brand car',
  category_id: '213123123',
  daily_rate: 20,
  description: 'description car',
  fine_amount: 2,
  license_plate: 'license plate car',
};

let specificationPayload = {
  description: 'Test specification',
  name: 'Test'
}

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });

  it('should not be able to in add a new Car Specification', async () => {
    expect( async () => {
      const car_id = '12345';
      const specifications_id = ['313123'];

      await createCarSpecificationUseCase.execute({car_id, specifications_id});
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new Car Specification', async () => {
    const carResponse = await carsRepositoryInMemory.create(car);
    const specification = await specificationsRepositoryInMemory.create(specificationPayload);
    
    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({car_id: carResponse.id, specifications_id});

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});