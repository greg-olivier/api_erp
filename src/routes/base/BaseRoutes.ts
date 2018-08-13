import * as express from "express";
import UserRoutes from "./../UserRoutes";

class BaseRoutes {

    static get routes() {
        let app = express();
        app.use("/", new UserRoutes().routes);
        return app;
    }
}
export default BaseRoutes;