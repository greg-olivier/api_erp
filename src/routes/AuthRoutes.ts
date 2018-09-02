import * as express from "express";
import AuthController from "../controllers/AuthController";
import {guard} from "../config/middlewares/Guard";

let router = express.Router();
class AuthRoutes {
  private _authController: AuthController;

  constructor () {
    this._authController = new AuthController();
  }
  get routes () {
    let controller = this._authController;
    router.post("/login", controller.login);
    router.post("/register", controller.register);
    router.post("/refresh", guard, controller.refresh);
    router.get("/logout", controller.logout);
    router.get("/", controller.welcome);

    return router;
  }
}

Object.seal(AuthRoutes);
export default AuthRoutes;
