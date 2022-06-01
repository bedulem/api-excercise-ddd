import { provideSingleton } from "infrastructure/inversify/CustomProviders";
import { COMMAND, ICommand } from "../Command";
import { writeInfo, writeSuccess } from "../utils";
import { IPublishReportsService } from "domain/service/report/PublishReportsService";
import { TYPES } from "application/config/ioc/types";
import { inject } from "inversify";

@provideSingleton(COMMAND)
export class PublishReports implements ICommand {
    public name: string = "publishReports";

    @inject(TYPES.PublishReportsService) private readonly publishReportsService: IPublishReportsService;

    public async execute(): Promise<void> {
        const report = await this.publishReportsService.publish();
        if (!report) {
            writeInfo("no report to publish");
        } else {
            for (const rep of report) {
                writeInfo(`Repo: ${rep.title}, PublishAT:  ${rep.publishAT}`);
            }
            writeSuccess("update finished");
        }
    }
}
