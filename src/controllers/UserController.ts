import * as express from "express";
import UserService from "../services/UserService";
import IBaseController from "./interfaces/base/IBaseController";
import IUserModel from "../models/interfaces/IUserModel";
import HandleError from "../handlers/RequestError";


class UserController implements IBaseController <UserService> {

    create(req: express.Request, res: express.Response): void {

            let user: IUserModel = <IUserModel>req.body;
            let userBusiness = new UserService();
            userBusiness.create(user)
                .then((result: IUserModel) => {
                res.send({"success": result})
            })
                .catch((err: HandleError) => {
                    console.error(err);
                    res.send({"error": err.name + ": " + err.message});
            });


    }

    update(req: express.Request, res: express.Response): void {

            let user: IUserModel = <IUserModel>req.body;
            let _id: string = req.params._id;
            let userBusiness = new UserService();
            userBusiness.update(_id, user)
                .then(result => {
                res.send({"success": "update successful"});
            })
                .catch(err => {
                    console.error(err);
                    res.send({"error": err.name + ": " + err.message});
            })


    }

    delete(req: express.Request, res: express.Response): void {

            let _id: string = req.params._id;
            let userBusiness = new UserService();
            userBusiness.delete(_id)
                .then(result => {
                res.send({"success": "delete successful"});
            })
                .catch(err => {
                    console.error(err);
                    res.send({"error": err.name + ": " + err.message});
            });

    }

    find(req: express.Request, res: express.Response): void {
        let userBusiness = new UserService();
        userBusiness.find()
            .then(result => {
                res.send({"result": result});
            })
            .catch(err => {
                console.error(err);
                res.send({"error": err.name + ": " + err.message});
            });
    }

    findById(req: express.Request, res: express.Response): void {
        let _id: string = req.params._id;
        let userBusiness = new UserService();
        userBusiness.findById(_id)
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                console.error(err);
                res.send({"error": err.name + ": " + err.message});
            })
    }
}

export default UserController;
