import * as express from "express";
import UserController from "./../controllers/UserController";
import {guard} from "../config/middlewares/Guard";

let router = express.Router();
class UserRoutes {
    private _userController: UserController;

    constructor () {
        this._userController = new UserController();
    }
    get routes () {
        let controller = this._userController;
        router.get("/", controller.find);
        router.put("/:_id", controller.update);
        router.get("/:_id", controller.findById);
        router.delete("/:_id", controller.delete);

        return router;
    }
}

Object.seal(UserRoutes);
export default UserRoutes;
