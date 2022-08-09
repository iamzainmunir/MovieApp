import CreateFilmController from "./controller/films.create.controller"
import FetchFilmController from "./controller/films.fetch.controller"
import FilmUploadImageController from "./controller/films.upload_image.controller"
import FilmFetchBySlugController from "./controller/films.fetch_by_slug.controller"
import UserAuthentication from "../../common/userAuthentication/userAuthentication";
import uploadImageConfig from "./services/image_upload.service"

export class FilmRoutes {
  public initialize(app: any, baseUrl: string): void {

    const createFilmController = new CreateFilmController(),
    fetchFilmController = new FetchFilmController(),
    filmUploadImageController = new FilmUploadImageController(),
    filmFetchBySlugController = new FilmFetchBySlugController();

    app.route(baseUrl + "/film")
      .post(UserAuthentication, uploadImageConfig, createFilmController.create)
      .get(fetchFilmController.fetch)

    app.route(baseUrl + "/film/:slug")
      .get(filmFetchBySlugController.fetchBySlug)


    // app.route(baseUrl + "/film/upload")
    //   .post(uploadImageConfig, filmUploadImageController.upload)
  }
}
