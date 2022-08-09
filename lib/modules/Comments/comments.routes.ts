import CommentsCreateController from "./controller/comments.create.controller"
// import CommentsFetchController from "./controller/comments.fetch.controller"
// import CommentsUpdateController from "./controller/comments.update.controller"
// import CommentsDeleteController from "./controller/comments.delete.controller"
import UserAuthentication from "../../common/userAuthentication/userAuthentication";

export class CommentRoutes {
  public initialize(app: any, baseUrl: string): void {

    const commentsCreateController = new CommentsCreateController();
    // commentsFetchController = new CommentsFetchController(),
    // commentsUpdateController = new CommentsUpdateController(),
    // commentsDeleteController = new CommentsDeleteController();

    app.route(baseUrl + "/comment")
      .post(UserAuthentication, commentsCreateController.create)
    //   .get(UserAuthentication, commentsFetchController.fetch)

    // app.route(baseUrl + "/comment/:comment_id")
    //   .put(UserAuthentication, commentsUpdateController.update)
    //   .delete(UserAuthentication, commentsDeleteController.delete)
  }
}
