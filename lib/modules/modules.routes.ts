import { UserRegistrationRoute } from './Users/user.route';
import { FilmRoutes } from './Films/films.routes';
import { CommentRoutes } from './Comments/comments.routes'

export default class Routes {
    public initializeRoutes = (app: any) => {
        const userRegistrationRoute = new UserRegistrationRoute(),
        filmRoutes = new FilmRoutes(),
        commentRoutes = new CommentRoutes();

        userRegistrationRoute.initialize(app, this.BASEURL);
        filmRoutes.initialize(app, this.BASEURL);
        commentRoutes.initialize(app, this.BASEURL);
    }


    private BASEURL: string = "/api";
}