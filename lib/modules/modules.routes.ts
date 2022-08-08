import { UserRegistrationRoute } from './Users/user.route';
import { FilmRoutes } from './Films/films.routes';

export default class Routes {
    public initializeRoutes = (app: any) => {
        const userRegistrationRoute = new UserRegistrationRoute(),
        filmRoutes = new FilmRoutes();

        userRegistrationRoute.initialize(app, this.BASEURL);
        filmRoutes.initialize(app, this.BASEURL);
    }


    private BASEURL: string = "/api";
}