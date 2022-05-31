import supertest from "supertest";
import { TYPES } from "application/config/ioc/types";
import { ConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { bootstrapApplication } from "application/config/bootstrap";
import e from "express";
import { Container } from "inversify";
import { Server } from "http";
import { collectionName as userCollectionName } from "infrastructure/repository/UserRepository";
import { collectionName } from "infrastructure/repository/ReportRepository";
import { examplesUser, examplesReport } from "tests/Helpers";

describe("Get Reports", () => {
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

    it("Success - find all", async () => {
        const response = await request.get("/reports").send();

        expect(response.status).toBe(200);
        expect(response.body.length).toStrictEqual(examplesReport.length);
        expect(response.body[0].id).toStrictEqual(examplesReport[0].id);
        expect(response.body[0].title).toStrictEqual(examplesReport[0].title);
    });

    it("Success - find by dateFrom ", async () => {
        const response = await request.get("/reports").query({ dateFrom: 1649342223}).send();

        expect(response.status).toBe(200);
        expect(response.body.length).toStrictEqual(1);
        expect(response.body[0].id).toStrictEqual(examplesReport[2].id);
        expect(response.body[0].title).toStrictEqual(examplesReport[2].title);
    });
});
