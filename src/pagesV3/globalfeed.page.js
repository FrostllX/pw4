import { BasePage } from './base.page'

export class GlobalFeedPage extends BasePage  {
   constructor (page) {
       super(page);
       //техническое описание страницы
       this.signupLink = page.getByRole('link', { name: 'Sign up' });
       this.loginLink = page.getByRole('link', { name: 'Login' });
       this.yourfeedEmptyText = page.getByText('Articles not available.');
   }
   //бизнесовые действия со страницей
   async gotoRegister() {
      await this.signupLink.click();
    }
}