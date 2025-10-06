import { test, expect } from "@playwright/test";
import { Api } from "../src/services/api.service";
let token;
test.describe.only("Challenge", () => {
    test.beforeAll(async ({ request }, testinfo) => {
        const api = new Api(request);
        let r = await api.challenger.post( testinfo );
        const headers = r.headers();
        console.log(`${testinfo.project.use.apiURL}${headers.location}`);
        token = headers["x-challenger"];
        console.log(token);
    });
    test("Получить токен", async ({ request }, testinfo) => {
        const api = new Api(request);
        let body  = await api.challenges.get(token, testinfo);
        expect(body.challenges.length).toBe(59);
    });
});
