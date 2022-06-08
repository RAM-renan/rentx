import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {

    beforeEach(()=>{
        carsRepositoryInMemory= new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase= new CreateCarSpecificationUseCase(carsRepositoryInMemory,
            specificationsRepositoryInMemory);
    })

    it("should not be able to add a new specification to a non-existent car", async() =>{
        const car_id = "5634563";
        const specifications_id = ["54321"];

        await expect(
            createCarSpecificationUseCase.execute({car_id, specifications_id})
        ).rejects.toEqual(new AppError("car dosen't exists"));
    })

    it("should be able to add a new specification to the car", async() =>{
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test"
        });

        const specifications_id = [specification.id];

        const specificationCars = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id});

        expect(specificationCars).toHaveProperty("specifications");
        expect(specificationCars.specifications.length).toBe(1);
    });
});