import { bootstrapApplication } from "application/config/bootstrap";
import { TYPES } from "application/config/ioc/types";
import { ReportStatus } from "domain/entity/Report";
import e from "express";
import { Server } from "http";
import { ConnectionManager } from "infrastructure/mongodb/ConnectionManager";
import { collectionName } from "infrastructure/repository/ReportRepository";
import { collectionName as userCollectionName} from "infrastructure/repository/UserRepository";
import { Container } from "inversify";
import supertest from "supertest";
import { examplesReport, examplesUser, tokenTest } from "tests/Helpers";


describe("Post User", () => {
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
            .getCollection(collectionName)
            .insertMany(examplesReport);

        await container
            .get<ConnectionManager>(TYPES.ConnectionManager)
            .getCollection(userCollectionName)
            .insertMany(examplesUser);
    });

    afterAll(async () => {
        await container.get<ConnectionManager>(TYPES.ConnectionManager).getCollection(collectionName).drop();
        await container.get<ConnectionManager>(TYPES.ConnectionManager).getCollection(userCollectionName).drop();
        await container.get<ConnectionManager>(TYPES.ConnectionManager).close();
        server.close();
    });

    it("Success -Draft", async () => {
        const response = await request.post("/reports").send(
    {
        userId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        title: "new Report",
        content: "Lorem ipsum",
        publishAT: 9994021800,
        
    }).set({authorization: tokenTest});

        expect(response.status).toBe(201);
        expect(response.body.userId).toStrictEqual("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d");
        expect(response.body.title).toStrictEqual("new Report");
        expect(response.body.content).toStrictEqual("Lorem ipsum");
        expect(response.body.publishAT).toStrictEqual(9994021800);
        expect(response.body.status).toStrictEqual(ReportStatus.draft);
    });

    it("Success -Publish", async () => {
        const response = await request.post("/reports").send(
    {
        userId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        title: "new Report2",
        content: "Lorem ipsum",
        publishAT: 1554021800,
        
    }).set({authorization: tokenTest});

        expect(response.status).toBe(201);
        expect(response.body.userId).toStrictEqual("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d");
        expect(response.body.title).toStrictEqual("new Report2");
        expect(response.body.content).toStrictEqual("Lorem ipsum");
        expect(response.body.publishAT).toStrictEqual(1554021800);
        expect(response.body.status).toStrictEqual(ReportStatus.published);
    });

    it("Unauthorized Fail", async () => {
    const response = await request.post("/reports").send(
    {
        userId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        title: "new Report",
        content: "Lorem ipsum",
        publishAT: 1654021800,
        
    }).set({authorization: ""});

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Invalid Token");
    });
});
