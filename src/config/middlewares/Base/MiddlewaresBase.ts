import * as express from "express";
import * as bodyParser from "body-parser";


class MiddlewaresBase {

    static get configuration() {
        let app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        return app;
    }
}
Object.seal(MiddlewaresBase);
export default MiddlewaresBase;