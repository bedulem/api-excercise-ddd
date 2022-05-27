import { UpdateReportService } from "domain/service/report/UpdateReportService";
import { IConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { ReportRepository } from "infrastructure/repository/ReportRepository";
import { examplesReport } from "tests/Helpers";

jest.mock("infrastructure/repository/ReportRepository", () => ({
    ReportRepository: jest.fn().mockImplementation(() => ({
        findOneById: (id: string) =>
            id === "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
                ? {
                      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                      title: "tyron report", 
                      content: "lorem ipsum", 
                      publishAT: 1649342221,
                  }
                : null,
        persist: () => {},
    })),
}));


describe("Update Report Service", () => {
    const repository = new ReportRepository({} as IConnectionManager);
    const service = new UpdateReportService(repository);

    it("Success", async () => {
        const report = await service.update(examplesReport[0], { userId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",title: "tyron report", content: "lorem ipsum", publishAT: 1649342221  });

        expect(repository.persist).toHaveBeenCalledTimes(1);
        expect(examplesReport[0].userId).toEqual("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d");
        expect(examplesReport[0].title).toEqual("tyron report");
        expect(examplesReport[0].content).toEqual("lorem ipsum");
        expect(examplesReport[0].publishAT).toEqual(1649342221);
    });
});
