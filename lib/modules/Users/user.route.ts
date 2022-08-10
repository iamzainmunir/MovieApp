import UserRegistrationController from "./controller/user_registration.controller"
import UserLoginController from "./controller/user_login.controller"
import UserVerifyToken from "./controller/user.verify_token.controller"
import UserAuthentication from "../../common/userAuthentication/userAuthentication";
 
export class UserRegistrationRoute {
  public initialize(app: any, baseUrl: string): void {

    const userRegistrationController = new UserRegistrationController(),
    userLoginController = new UserLoginController(),
    userVerifyToken = new UserVerifyToken();

    app
      .route(baseUrl + "/user/registration")
      .post(userRegistrationController.register);

    app
      .route(baseUrl + "/user/login")
      .post(userLoginController.login);

    app
      .route(baseUrl + "/user/verify/token")
      .get(UserAuthentication, userVerifyToken.verify);
      
  }
}
