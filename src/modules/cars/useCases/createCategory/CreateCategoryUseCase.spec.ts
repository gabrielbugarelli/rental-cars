import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to create a new category', async () => {
    let category = {
      name: 'Category Test',
      description: 'Category Description Test'
    };

    await createCategoryUseCase.execute(category);
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('shloud not be able to create a new category with name exits', async () => {
    expect( async () => {
      let category = {
        name: 'Category Test',
        description: 'Category Description Test'
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});