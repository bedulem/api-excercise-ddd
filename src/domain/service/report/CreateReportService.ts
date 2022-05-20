import { TYPES } from "application/config/ioc/types";
import { Report } from "domain/entity/Report";
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
export interface ICreateReportDto {
    userId: string;
    title: string;
    content: string;
    publishAt: number;
}

export interface ICreateReportService {
    create(dto: ICreateReportDto): Promise<Report>;
}

@provideSingleton(TYPES.CreateReportService)
export class CreateReportService implements ICreateReportService {
    private readonly reportRepository: IReportRepository;

    constructor(@inject(TYPES.ReportRepository) reportRepository: IReportRepository) {
        this.reportRepository = reportRepository;
    }

    @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository;

    public async create({ userId, title, content }: ICreateReportDto): Promise<Report> {
        const user: User | null = await this.userRepository.findOneById(userId);
        if (user === null) {
            throw new ServiceValidationException(`User with id ${userId} not found`);
        }

        const timestamp = (Date.now() / 1000) | 0;

        const report: Report = {
            id: " ", //uuid(),
            userId,
            title,
            content,
            createdAT: timestamp,
            updatedAT: timestamp,
            status: 0,
            publishAt: timestamp,
        };

        await this.reportRepository.persist(report);

        return report;
    }
}
