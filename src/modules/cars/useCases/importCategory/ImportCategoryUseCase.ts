import fs from 'fs';
import { parse } from 'csv-parse';
import { IImportCategoriesRepository } from '../../repositories/IImportCategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoryUseCase {
  private importCategoriesRepository: IImportCategoriesRepository;

  constructor (importCategoriesRepository: IImportCategoriesRepository) {
    this.importCategoriesRepository = importCategoriesRepository;
  }
  
  loadFiles(file: Express.Multer.File): Promise<IImportCategory[]> {
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

    console.log(categories);
  }
}