import { body, param } from "express-validator";
import { validatorResponseMiddleware } from "../utils";

export const putUserValidator = [
    body("name").isString().isLength({ min: 2, max: 200 }),
    body("age").isNumeric().isInt({ gt: 12, lt: 121 }),
    body("country").isString().isLength({ min: 2, max: 2 }),
    param("id").isString().isUUID(4),
    validatorResponseMiddleware,
];
