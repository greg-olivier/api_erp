import * as express from "express";
import constant from "./config/constants/Constants";
import Middlewares from "./config/middlewares/Base/MiddlewaresBase";
import BaseRoutes from "./routes/base/BaseRoutes";

let app = Middlewares.configuration;
let port = constant.app.port;

app.set("port", port);

app.listen(port, () => {
    console.log("API is running at " + constant.app.host + ":" + constant.app.port);
});

app.use("/", BaseRoutes.routes);