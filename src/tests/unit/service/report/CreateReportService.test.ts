import { ReportStatus } from "domain/entity/Report";
import { CreateReportService } from "domain/service/report/CreateReportService";
import { IConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { ReportRepository } from "infrastructure/repository/ReportRepository";
import { UserRepository } from "infrastructure/repository/UserRepository";
import { UuidGenerator } from "infrastructure/uuid/UuidGenerator";
import { examplesUser } from "tests/Helpers";

jest.mock("infrastructure/repository/ReportRepository");

jest.mock("infrastructure/repository/UserRepository", () => ({
    UserRepository: jest.fn().mockImplementation(() => ({
        findOneById: (userId: string) => (userId === "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" ? examplesUser[0] : null),
        persist: () => {},
    })),
}));

jest.mock("infrastructure/uuid/UuidGenerator", () => ({
    UuidGenerator: jest.fn().mockImplementation(() => ({
        getId: () => "8b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    })),
}));

describe("Create Report Service", () => {
    const repository = new ReportRepository({} as IConnectionManager);
    const userRepository = new UserRepository({} as IConnectionManager);
    const uuidGenerator = new UuidGenerator();

    //1653938700
    const service = new CreateReportService(repository, userRepository, uuidGenerator);

    it("Success", async () => {
        const report = await service.create({
            userId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            title: "Report Tyron",
            content: "Lorem ipsum",
            publishAT: 1649342221,
        });
        expect(repository.persist).toHaveBeenCalledTimes(1);
        expect(report.title).toEqual("Report Tyron");
        expect(report.content).toEqual("Lorem ipsum");
        expect(report.publishAT).toEqual(1649342221);
        expect(report.status).toEqual(ReportStatus.published);
    });
});
