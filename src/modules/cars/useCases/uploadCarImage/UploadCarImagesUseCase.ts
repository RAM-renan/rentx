import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface IRequest{
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase{
    constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository
    ){}

    async execute({car_id, images_name}: IRequest): Promise<void> {

        images_name.forEach(async image => {
            await deleteFile(`./tmp/cars/${image}`);
        });
            

        images_name.map(async(image) => {
            await this.carsImagesRepository.create(car_id, image);
        });
    }
}

export {UploadCarImagesUseCase}