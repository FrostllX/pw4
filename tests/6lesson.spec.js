import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/index';
import { RegisterPage } from '../src/pages/index';
import { UserBuilder } from '../src/helpers/builders/index';

const URL = 'https://realworld.qa.guru/';

test.describe('Регистрация', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('Пользователь может зарегистрироваться с навигацией через клавиатуру', async ({
        page,
    }) => {
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        await mainPage.gotoRegister();
        await registerPage.register(user);

        
        await expect(registerPage.emailErrorText).toContainText(
            'Email already exists.. try logging in'
        );
    });

    test('Пользователь не может зарегистрироваться повторно Builder', async ({
        page,
    }) => {
        const user = new UserBuilder()
            .addEmail()
            .addName()
            .addPassword()
            .generate();

        console.log(user);
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        await mainPage.gotoRegister();
        await registerPage.register(user);

        //todo переделать ассерт
        await expect(registerPage.emailErrorText).toContainText(
            'Email already exists.. try logging in'
        );
    });
});