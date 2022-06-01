import { TYPES } from "application/config/ioc/types";
import { Report, ReportStatus } from "domain/entity/Report";
import { ServiceValidationException } from "domain/exception/ServiceValidationException";
import { IReportRepository } from "domain/repository/ReportRepository";
import { provideSingleton } from "infrastructure/inversify/CustomProviders";
import { inject } from "inversify";
import { IUpdateUserService } from "../user/UpdateUserService";
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

export interface IPublishReportsService {
    publish(): Promise<string>;
}

@provideSingleton(TYPES.PublishReportsService)
export class PublishReportsService implements IPublishReportsService {
    private readonly reportRepository: IReportRepository;

    constructor(@inject(TYPES.ReportRepository) reportRepository: IReportRepository) {
        this.reportRepository = reportRepository;
    }

    public async publish(): Promise<string> {
        const timestamp = (Date.now() / 1000) | 0;
        const reports: Report[] = await this.reportRepository.findAllReports(
            undefined,
            undefined,
            undefined,
            timestamp
        );

        if (reports.length === 0) {
            return "no reports to publish";
        }

        for (const report of reports) {
            report.updatedAT = timestamp;
            report.status = ReportStatus.published;
            await this.reportRepository.persist(report);
        }
        return "Update finished";
    }
}
