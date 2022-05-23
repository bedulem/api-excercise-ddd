import { TYPES } from "application/config/ioc/types";
import { provideSingleton } from "infrastructure/inversify/CustomProviders";
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

export interface IIdGeneratorService {
    getId(): string;
}
