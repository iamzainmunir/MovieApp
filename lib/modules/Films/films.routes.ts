import CreateFilmController from "./controller/films.create.controller"
import FetchFilmController from "./controller/films.fetch.controller"
import FilmUploadImageController from "./controller/films.upload_image.controller"
import FilmFetchBySlugController from "./controller/films.fetch_by_slug.controller"
import UserAuthentication from "../../common/userAuthentication/userAuthentication";

export class FilmRoutes {
  public initialize(app: any, baseUrl: string): void {

    const createFilmController = new CreateFilmController(),
    fetchFilmController = new FetchFilmController(),
    filmUploadImageController = new FilmUploadImageController(),
    filmFetchBySlugController = new FilmFetchBySlugController();

    app.route(baseUrl + "/film")
      .post(UserAuthentication, createFilmController.create)
      .get(UserAuthentication, fetchFilmController.fetch)

    app.route(baseUrl + "/film/:slug")
      .get(UserAuthentication, filmFetchBySlugController.fetchBySlug)

    app.route(baseUrl + "/film/upload")
      .post(UserAuthentication, filmUploadImageController.upload)
  }
}
