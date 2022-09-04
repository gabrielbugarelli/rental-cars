import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import { parse } from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/contracts/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor (@inject('CategoriesRepository') categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  
  async loadFiles(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
  
      const parseFile = parse({delimiter: ','});
      stream.pipe(parseFile);
  
      parseFile.on("data", async (line) => {
        const [ name, description ] = line;
        categories.push({ name, description });
      }).on("end", () => {
        resolve(categories);
      }).on("error", (error) => {
        reject(error);
      });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadFiles(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if(!existCategory) {
        await this.categoriesRepository.create({name, description});
      }
    });
  }
}