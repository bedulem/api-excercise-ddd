
import { ReportStatus } from "domain/entity/Report";
import { PublishReportsService } from "domain/service/report/PublishReportsService";
import { IConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { ReportRepository } from "infrastructure/repository/ReportRepository";
import { examplesReport } from "tests/Helpers";

jest.mock("infrastructure/repository/ReportRepository", () => ({
    ReportRepository: jest.fn().mockImplementation(() => ({
        findAllReports: (userId?: string, dateFrom?: number, dateTo?: number, draftTo?: number) =>
            draftTo
                ? examplesReport
                : null,
        persist: () => {},
    })),
}));


describe("Publish Report Service", () => {
    const repository = new ReportRepository({} as IConnectionManager);
    const service = new PublishReportsService(repository);

    it("Success", async () => {
        const spy = jest.spyOn(repository, "persist");
        const report = await service.publish();

    expect(spy).toHaveBeenCalledTimes(3);
    expect(examplesReport[0].status).toEqual(ReportStatus.published);
    
    });
});
