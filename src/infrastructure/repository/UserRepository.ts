import { TYPES } from "application/config/ioc/types";
import { User } from "domain/entity/User";
import { IUserRepository } from "domain/repository/UserRepository";
import { provideSingleton } from "infrastructure/inversify/CustomProviders";
import { IConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { MongoRepository } from "infrastructure/mongodb/MongoRepository";
import { inject } from "inversify";

export const collectionName: string = "user";

@provideSingleton(TYPES.UserRepository)
export class UserRepository extends MongoRepository implements IUserRepository {
    constructor(@inject(TYPES.ConnectionManager) ConnectionManager: IConnectionManager) {
        super();

        this.collection = ConnectionManager.getCollection(collectionName);
    }

    public async findAllPaginated(offset: number, limit: number, age?: number, country?: string): Promise<User[]> {
        const filter: { [key: string]: unknown } = {};
        if (age) {
            filter.age = age;
        }

        if (country) {
            filter.country = country;
        }

        return await this.findBy(filter, null, offset, limit);
    }

    public async findOneById(id: string): Promise<User | null> {
        return await this.findOneBy<User>({ id });
    }
}
