import { TYPES } from "application/config/ioc/types";
import { provideSingleton } from "infrastructure/inversify/CustomProviders";
import { inject } from "inversify";
import { User } from "../../entity/User";
import { IUserRepository } from "../../repository/UserRepository";
import { IIdGeneratorService } from "../id/IdGeneratorService";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateExampleDto:
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
export interface IcreateUserDto {
    email: string;
    name: string;
    age: number;
    country: string;
}

export interface ICreateUserService {
    create(dto: IcreateUserDto): Promise<User>;
}

@provideSingleton(TYPES.CreateUserService)
export class CreateUserService implements ICreateUserService {
    private readonly userRepository: IUserRepository;

    constructor(@inject(TYPES.UserRepository) userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    @inject(TYPES.UuidGenerator) private readonly uuidGenerator: IIdGeneratorService;

    private readonly uuidgenerator: IIdGeneratorService;

    public async create({ email, name, age, country }: IcreateUserDto): Promise<User> {
        const timestamp = (Date.now() / 1000) | 0;

        const user: User = {
            id: this.uuidGenerator.getId(),
            email,
            name,
            age,
            country,
            createdAT: timestamp,
            updatedAT: timestamp,
        };

        await this.userRepository.persist(user);

        return user;
    }
}
