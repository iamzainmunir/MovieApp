import UserRegistrationController from "./controller/user_registration.controller"
import UserLoginController from "./controller/user_login.controller"
export class UserRegistrationRoute {
  public initialize(app: any, baseUrl: string): void {

    const userRegistrationController = new UserRegistrationController(),
    userLoginController = new UserLoginController();

    app
      .route(baseUrl + "/user/registration")
      .post(userRegistrationController.register);

    app
      .route(baseUrl + "/user/login")
      .post(userLoginController.login);
      
  }
}
