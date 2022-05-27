import { ReportStatus } from "domain/entity/Report";

export const examples = [
    { id: 1, value: "example 1", createdAt: 1649342221, updatedAt: 1649342221 },
    { id: 2, value: "example 2", createdAt: 1649342221, updatedAt: 1649342221 },
    { id: 3, value: "example 3", createdAt: 1649342221, updatedAt: 1649342221 },
];

export const examplesUser = [
    {id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", email: "tyron@winterfell.com", name: "tyron lannister", age:46 , country: "AR", createdAT:1649342221 , updatedAT: 1649342221},
    {id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", email: "jonsnow@winterfell.com", name: "jon snow", age:24 , country: "AR", createdAT:1649342221 , updatedAT: 1649342221},
    {id: "109156be-c4fb-41ea-b1b4-efe1671c5836", email: "cersei@winterfell.com", name: "cersei lannister", age:49 , country: "AR", createdAT:1649342221 , updatedAT: 1649342221},
];


export const examplesReport = [
    {id: "8b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        userId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        title: "tyron report",
        content: "Lorem ipsum",
        createdAT: 1649342221,
        updatedAT: 1649342221,
        status: ReportStatus.draft,
        publishAT: 1649342221,},

        {id: "2b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        userId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        title: "jon report",
        content: "Lorem ipsum",
        createdAT: 1649342221,
        updatedAT: 1649342221,
        status: ReportStatus.draft,
        publishAT: 1649342221,},

        {id: "209156be-c4fb-41ea-b1b4-efe1671c5836",
        userId: "109156be-c4fb-41ea-b1b4-efe1671c5836",
        title: "cersei report",
        content: "Lorem ipsum",
        createdAT: 1649342221,
        updatedAT: 1649342221,
        status: ReportStatus.published,
        publishAT: 1649342221,},
]
