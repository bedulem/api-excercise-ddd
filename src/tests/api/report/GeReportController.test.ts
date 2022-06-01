import supertest from "supertest";
import { TYPES } from "application/config/ioc/types";
import { ConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { bootstrapApplication } from "application/config/bootstrap";
import e from "express";
import { Container } from "inversify";
import { Server } from "http";
import { collectionName } from "infrastructure/repository/ReportRepository";
import { collectionName as userCollectionName } from "infrastructure/repository/UserRepository";
import { examplesUser, examplesReport } from "tests/Helpers";

describe("Get Report", () => {
    let app: e.Application, container: Container;
    let request: supertest.SuperTest<supertest.Test>;
    let server: Server;

    beforeAll(async () => {
        const application = await bootstrapApplication();

        app = application.app;
        container = application.container;
        server = application.server;
        request = supertest(app);

        await container
            .get<ConnectionManager>(TYPES.ConnectionManager)
            .getCollection(userCollectionName)
            .insertMany(examplesUser);

        await container
            .get<ConnectionManager>(TYPES.ConnectionManager)
            .getCollection(collectionName)
            .insertMany(examplesReport);
    });

    afterAll(async () => {
        await container.get<ConnectionManager>(TYPES.ConnectionManager).getCollection(collectionName).drop();
        await container.get<ConnectionManager>(TYPES.ConnectionManager).getCollection(userCollectionName).drop();
        await container.get<ConnectionManager>(TYPES.ConnectionManager).close();
        server.close();
    });

    it("Success", async () => {
        const response = await request.get("/reports/8b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d").send();

        expect(response.status).toBe(200);
        expect(response.body.id).toStrictEqual(examplesReport[0].id);
        expect(response.body.title).toStrictEqual(examplesReport[0].title);
        expect(response.body.content).toStrictEqual(examplesReport[0].content);
    });

    it("Fails because example does not exist", async () => {
        const response = await request.get("/reports/8b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb00").send();

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Report with id 8b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb00 not found");
    });
});
