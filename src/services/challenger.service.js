import { test } from "@playwright/test";
//let r = await request.post('${testinfo.project.use.apiURL}/challenger');
export class ChallengerService {
   constructor(request) {
    this.request = request;
   }

   async post(testinfo) {
      return test.step( "POST /challenger", async () => {
      const response = await this.request.post(
         `${testinfo.project.use.apiURL}/challenger`, 
      );
      return response;
   });
 }
}