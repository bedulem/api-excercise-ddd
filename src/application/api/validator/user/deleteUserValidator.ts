import { param } from "express-validator";
import { validatorResponseMiddleware } from "../utils";

export const deleteUserValidator = [param("id").isUUID(4), validatorResponseMiddleware];
