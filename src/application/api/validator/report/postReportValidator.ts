import { body, param } from "express-validator";
import { validatorResponseMiddleware } from "../utils";

export const postReportValidator = [
    body("userId").notEmpty().isUUID(4),
    body("title").notEmpty().isString().isLength({ min: 2, max: 200 }),
    body("content").notEmpty().isString().isLength({ min: 2, max: 1000 }),
    validatorResponseMiddleware,
];
