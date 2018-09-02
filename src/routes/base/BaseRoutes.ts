import * as express from "express";
import UserRoutes from "./../UserRoutes";
import AuthRoutes from "./../AuthRoutes";
import {guard} from "../../config/middlewares/Guard";


class BaseRoutes {

  static get routes () {
    let app = express();
    let router = express.Router();
    app.use("/user", guard, new UserRoutes().routes)
    app.use("/", new AuthRoutes().routes);


    // Handle 404's errors

    app.use((req: express.Request, res: express.Response) => {
      res.status(404).json('Not Found');
    });

    // Handle 500's errors
    app.use(function(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500)
    return res.json(err);
 });
  return app;
}
}
export default BaseRoutes;
