import { body, param } from "express-validator";
import { validatorResponseMiddleware } from "../utils";

export const putReportValidator = [
    body("userId").isUUID(4),
    body("title").isString().isLength({ min: 2, max: 200 }),
    body("content").isString().isLength({ min: 2, max: 1000 }),
    param("id").notEmpty().isUUID(4),
    validatorResponseMiddleware,
];
