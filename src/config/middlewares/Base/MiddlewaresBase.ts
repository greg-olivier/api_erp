import * as express from "express";
import * as bodyParser from "body-parser";



class MiddlewaresBase {

    static configuration(app: express.Application) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*'); // dev only
            res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            if(req.method === 'OPTIONS'){
                res.status(200).send();
            } else {
                next();
            }
        });
        return app;
    }
}
Object.seal(MiddlewaresBase);
export default MiddlewaresBase;