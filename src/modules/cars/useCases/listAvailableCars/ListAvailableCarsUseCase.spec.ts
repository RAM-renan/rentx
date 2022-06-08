import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Lsit Cars", () => {
    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async() => {
        const car = await carsRepositoryInMemory.create({
          "name": "Car1",
          "description": "car descr",
          "daily_rate": 120.00,
          "license_plate": "DFT-1234",
          "fine_amount": 200,
          "brand": "Stand",
          "category_id": "category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({});
        
        expect(cars).toEqual([car]);
    })

    it("should be able to list all available cars by brand", async() => {
        const car = await carsRepositoryInMemory.create({
          "name": "Car3",
          "description": "car descr",
          "daily_rate": 120.00,
          "license_plate": "DFT-1234",
          "fine_amount": 200,
          "brand": "Standart",
          "category_id": "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Standart",
        });
        
        expect(cars).toEqual([car]);
    })

    it("should be able to list all available cars by name", async() => {
        const car = await carsRepositoryInMemory.create({
          "name": "Car3",
          "description": "car descr",
          "daily_rate": 120.00,
          "license_plate": "DFT-1235",
          "fine_amount": 200,
          "brand": "Standart",
          "category_id": "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });
        
        expect(cars).toEqual([car]);
    })

    it("should be able to list all available cars by category", async() => {
        const car = await carsRepositoryInMemory.create({
          "name": "Car3",
          "description": "car descr",
          "daily_rate": 120.00,
          "license_plate": "DFT-12345",
          "fine_amount": 200,
          "brand": "Standart",
          "category_id": "12345"
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });
        
        expect(cars).toEqual([car]);
    })
})