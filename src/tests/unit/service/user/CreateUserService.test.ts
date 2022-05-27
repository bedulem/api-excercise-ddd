import { CreateUserService } from "domain/service/user/CreateUserService";
import { IConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { UserRepository } from "infrastructure/repository/UserRepository";
import { UuidGenerator } from "infrastructure/uuid/UuidGenerator";

jest.mock("infrastructure/repository/UserRepository");
jest.mock("infrastructure/uuid/UuidGenerator", ()=>({
    UuidGenerator: jest.fn().mockImplementation(()=> ({
        getId: () => {return "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"}
    })),
}));

describe("Create User Service", ()=>{
    const repository = new UserRepository({} as IConnectionManager);
    const service = new CreateUserService(repository);
    const uuid = new UuidGenerator();

    it("Success", async () => {
        const user = await service.create({
            email: "tyron@winterfell.com",
            name: "tyron",
            age: 46,
            country: "AR"
        });
        expect(repository.persist).toHaveBeenCalledTimes(1);
        expect(user.email).toEqual("tyron@winterfell.com");
        expect(user.name).toEqual("tyron");
        expect(user.age).toEqual(46);
        expect(user.country).toEqual("AR");
        
    })

});
