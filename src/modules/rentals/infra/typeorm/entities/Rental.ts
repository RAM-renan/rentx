import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { join } from "path";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("rentals")
class Rental{
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Car)
    @JoinColumn({name: "car_id"})
    car: Car;

    @Column()
    car_id: string;

    @Column()
    user_id: string;

    @Column()
    start_date: Date;

    
    @Column()
    end_date: Date;

    
    @Column()
    expected_return_date: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date;

    
    @UpdateDateColumn()
    update_at: Date;

    constructor() {
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export {Rental};