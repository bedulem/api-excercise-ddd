import { TYPES } from "application/config/ioc/types";
import { IIdGeneratorService } from "domain/service/id/IdGeneratorService";
import { provideSingleton } from "infrastructure/inversify/CustomProviders";
import { v4 as uuid } from "uuid";

@provideSingleton(TYPES.UuidGenerator)
export class UuidGenerator implements IIdGeneratorService {
    getId(): string {
        return uuid();
    }
}
