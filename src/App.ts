import * as dotenv from 'dotenv';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import BaseRoutes from "./routes/base/BaseRoutes";
import MiddlewaresBase from "./config/middlewares/Base/MiddlewaresBase";
import DataAccess from "./dataAccess/DataAccess";

class App {

    public express: express.Application;

    constructor() {
        // this.setEnvironment();
        this.express = express();
        this.database();
        this.middleware();
        this.routes();
    }


    /**
     * database connection
     */
    private database(): void {
        DataAccess.connect();
    }

    /**
     * http(s) request middleware
     */
    private middleware(): void {
        MiddlewaresBase.configuration(this.express);
    }

    /**
     * API main v1 routes
     */
    private routes(): void {
        this.express.use('/', BaseRoutes.routes);
    }

}

export default new App().express;
