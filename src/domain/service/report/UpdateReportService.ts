import { TYPES } from "application/config/ioc/types";
import { Report, ReportStatus } from "domain/entity/Report";
import { User } from "domain/entity/User";
import { ServiceValidationException } from "domain/exception/ServiceValidationException";
import { IReportRepository } from "domain/repository/ReportRepository";
import { IUserRepository } from "domain/repository/UserRepository";
import { provideSingleton } from "infrastructure/inversify/CustomProviders";
import { inject } from "inversify";
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
export interface IUpdateReportDto {
    userId: string;
    title: string;
    content: string;
    publishAT: number;
}

export interface IUpdateReportService {
    update(report: Report, dto: IUpdateReportDto): Promise<Report>;
}

@provideSingleton(TYPES.UpdateReportService)
export class UpdateReportService implements IUpdateReportService {
    private readonly reportRepository: IReportRepository;

    constructor(@inject(TYPES.ReportRepository) reportRepository: IReportRepository) {
        this.reportRepository = reportRepository;
    }

    @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository;

    public async update(report: Report, { userId, title, content, publishAT }: IUpdateReportDto): Promise<Report> {
        const user: User | null = await this.userRepository.findOneById(userId);
        if (user === null) {
            throw new ServiceValidationException(`User with id ${userId} not found`);
        }
        const timestamp = (Date.now() / 1000) | 0;
        const statusValue = publishAT < timestamp ? ReportStatus.published : ReportStatus.draft;

        report.userId = userId;
        report.title = title;
        report.content = content;
        report.updatedAT = timestamp;
        report.status = statusValue;
        report.publishAT = timestamp;

        await this.reportRepository.persist(report);

        return report;
    }
}
