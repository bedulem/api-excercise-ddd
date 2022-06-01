import { UpdateReportService } from "domain/service/report/UpdateReportService";
import { IConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { ReportRepository } from "infrastructure/repository/ReportRepository";
import { UserRepository } from "infrastructure/repository/UserRepository";
import { examplesReport } from "tests/Helpers";

jest.mock("infrastructure/repository/ReportRepository");

jest.mock("infrastructure/repository/UserRepository", () => ({
    UserRepository: jest.fn().mockImplementation(() => ({
        findOneById: (id: string) =>
            id === "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
                ? {
                    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", 
                    email: "tyrion@winterfell.com", 
                    name: "tyrion lannister", 
                    age: 46, 
                    country: "AR", 
                    createdAT:1649342221 , 
                    updatedAT: 1649342221,
                }
                : null,

    })),
}));

describe("Update Report Service", () => {
    const repository = new ReportRepository({} as IConnectionManager);
    const userRepository = new UserRepository({} as IConnectionManager);
    
    const service = new UpdateReportService(repository,userRepository);

    it("Success", async () => {
        const report = await service.update(examplesReport[0], { userId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        title: "new tyron report",
        content: "new lorem ipsum",
        publishAT: 1649342221  });

        expect(repository.persist).toHaveBeenCalledTimes(1);
        expect(examplesReport[0].userId).toEqual("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d");
        expect(examplesReport[0].title).toEqual("new tyron report");
        expect(examplesReport[0].content).toEqual("new lorem ipsum");
        expect(examplesReport[0].publishAT).toEqual(1649342221);
        
    });
});
