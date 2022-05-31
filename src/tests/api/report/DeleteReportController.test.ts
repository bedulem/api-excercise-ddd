import supertest from "supertest";
import { TYPES } from "application/config/ioc/types";
import { ConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { bootstrapApplication } from "application/config/bootstrap";
import e from "express";
import { Container } from "inversify";
import { Server } from "http";
import { collectionName } from "infrastructure/repository/ReportRepository";
import { collectionName as  userCollectionName} from "infrastructure/repository/UserRepository";
import { examplesUser, examplesReport, tokenTest } from "tests/Helpers";

describe("Delete Report", () => {
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
        const response = await request.delete("/reports/209156be-c4fb-41ea-b1b4-efe1671c5836").send().set({authorization: tokenTest});

        expect(response.status).toBe(204);
    });

    it("Fails because report does not exist", async () => {
        const response = await request.delete("/reports/209156be-c4fb-41ea-b1b4-efe1671c5800").send().set({authorization: tokenTest});

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Report with id 209156be-c4fb-41ea-b1b4-efe1671c5800 not found");
    });
});
