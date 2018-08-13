import * as express from "express";
import UserController from "./../controllers/UserController";

let router = express.Router();
class UserRoutes {
    private _userController: UserController;

    constructor () {
        this._userController = new UserController();
    }
    get routes () {
        let controller = this._userController;
        router.get("/users", controller.find);
        router.post("/users", controller.create);
        router.put("/users/:_id", controller.update);
        router.get("/users/:_id", controller.findOne);
        router.delete("/users/:_id", controller.delete);

        return router;
    }


}

Object.seal(UserRoutes);
export default UserRoutes;
