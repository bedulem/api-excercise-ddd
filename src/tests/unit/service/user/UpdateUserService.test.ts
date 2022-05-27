import { UpdateUserService } from "domain/service/user/UpdateUserService";
import { IConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { UserRepository } from "infrastructure/repository/UserRepository";
import { examplesUser } from "tests/Helpers";

jest.mock("infrastructure/repository/UserRepository");


describe("Create User Service", ()=>{
    const repository = new UserRepository({} as IConnectionManager);
    const service = new UpdateUserService(repository);

    it("success",async () => {
        const user = await service.update(examplesUser[0], { name: "tyron lannister", age:47 , country: "CL" 
    });

    expect(repository.persist).toHaveBeenCalledTimes(1);
        expect(examplesUser[0].name).toEqual("tyron lannister");
        expect(examplesUser[0].age).toEqual(47);
        expect(examplesUser[0].country).toEqual("CL");

});
        
    });
