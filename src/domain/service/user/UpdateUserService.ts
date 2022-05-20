import { TYPES } from "application/config/ioc/types";
import { IUserRepository } from "domain/repository/UserRepository";
import { provideSingleton } from "infrastructure/inversify/CustomProviders";
import { inject } from "inversify";
import { User } from "../../entity/User";

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateExampleDto:
 *       type: object
 *       required:
 *         - value
 *       properties:
 *         value:
 *           type: string
 *           description: Value of example
 *       example:
 *         value: "Mr. Robot"
 *
 */
export interface IUpdateUserDto {
    name: string;
    age: number;
    country: string;
}

export interface IUpdateUserService {
    update(user: User, dto: IUpdateUserDto): Promise<User>;
}

@provideSingleton(TYPES.UpdateUserService)
export class UpdateUserService implements IUpdateUserService {
    private readonly userRepository: IUserRepository;

    constructor(@inject(TYPES.UserRepository) userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async update(user: User, { name, age, country }: IUpdateUserDto): Promise<User> {
        user.name = name;
        user.age = age;
        user.country = country;
        user.updatedAT = (Date.now() / 1000) | 0;

        await this.userRepository.persist(user);

        return user;
    }
}
