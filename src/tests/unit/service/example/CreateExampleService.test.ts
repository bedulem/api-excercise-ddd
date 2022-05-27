// This test is only an example of how to do Unit testing and mock dependencies
import { ServiceValidationException } from "domain/exception/ServiceValidationException";
import { CreateExampleService } from "domain/service/example/CreateExampleService";
import { IConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { ExampleRepository } from "infrastructure/repository/ExampleRepository";

jest.mock("infrastructure/repository/ExampleRepository", () => ({
    ExampleRepository: jest.fn().mockImplementation(() => ({
        findOneById: (id: number) =>
            id === 45
                ? {
                      id: 45,
                      value: "test",
                  }
                : null,
        persist: () => {},
    })),
}));

describe("Create Example Service", () => {
    const repository = new ExampleRepository({} as IConnectionManager);
    const service = new CreateExampleService(repository);

    it("Success", async () => {
        const spy = jest.spyOn(repository, "persist");
        const example = await service.create({ id: 1, value: "test" });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(example.id).toEqual(1);
        expect(example.value).toEqual("test");
    });

    // it("Error: ID already persisted", async () => {});
});
