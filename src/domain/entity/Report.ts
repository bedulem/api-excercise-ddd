/**
 * @swagger
 * components:
 *   schemas:
 *     Example:
 *       type: object
 *       required:
 *         - id
 *         - value
 *       properties:
 *         id:
 *           type: string
 *           description: The id of example
 *         name:
 *           type: string
 *           description: Value of example
 *       example:
 *         id: "12345"
 *         name: "Mr. Robot"
 *
 */
export enum ReportStatus {
    published = "published",
    draft = "draft",
}

export interface Report {
    id: string;
    userId: string;
    title: string;
    content: string;
    createdAT: number;
    updatedAT: number;
    status: ReportStatus;
    publishAT: number;
}
