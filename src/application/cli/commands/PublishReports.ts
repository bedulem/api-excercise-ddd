import { provideSingleton } from "infrastructure/inversify/CustomProviders";
import { COMMAND, ICommand } from "../Command";
import { writeSuccess } from "../utils";
import { IPublishReportsService } from "domain/service/report/PublishReportsService";
import { TYPES } from "application/config/ioc/types";
import { inject } from "inversify";

@provideSingleton(COMMAND)
export class PublishReports implements ICommand {
    public name: string = "publishReports";

    @inject(TYPES.PublishReportsService) private readonly publishReportsService: IPublishReportsService;

    public async execute(args: string[]): Promise<void> {
        const message = await this.publishReportsService.publish();
        writeSuccess(`${message}`);
    }
}
