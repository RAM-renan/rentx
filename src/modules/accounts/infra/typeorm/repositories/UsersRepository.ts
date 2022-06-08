import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

class UsersRepository implements UsersRepository{
    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email});
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }

    async create({name,email,password,driver_license,id, avatar}): Promise<void> {
        const user = this.repository.create({
            name,email,password,driver_license,id,avatar,
        })

        await this.repository.save(user);
    }

}

export {UsersRepository}