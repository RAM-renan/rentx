import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

interface IImportCategories {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository){}

    loadCategories(file: Express.Multer.File): Promise<IImportCategories[]>{
        return new Promise((resolve,reject)=>{
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategories[] = [];

            const parseFile = parse();

            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [name,description] = line;
                categories.push({
                    name,
                    description,
                });
            })
            .on("end", ()=> {
                fs.promises.unlink(file.path);
                resolve(categories);
            })
            .on("error", (err)=> {
                reject(err);
            });
        });
    }

    async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadCategories(file);

        categories.map(async (category) => {
            const {name, description} = category;

            const existCategory = await this.categoriesRepository.findByName(name);

            if(!existCategory){
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        })
    }
}

export { ImportCategoryUseCase }