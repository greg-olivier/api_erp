import * as express from "express";
import UserBusiness from "./../app/business/UserBusiness";
import IBaseController from "./interfaces/base/IBaseController";
import IUserModel from "./../app/models/interfaces/IUserModel";



class UserController implements IBaseController <UserBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {

            let user: IUserModel = <IUserModel>req.body;
            let userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result) => {
                if(error) res.send({"error": error});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    update(req: express.Request, res: express.Response): void {
        try {
            let user: IUserModel = <IUserModel>req.body;
            let _id: string = req.params._id;
            let userBusiness = new UserBusiness();
            userBusiness.update(_id, user, (error, result) => {
                if(error) res.send({"error": error});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    delete(req: express.Request, res: express.Response): void {
        try {

            let _id: string = req.params._id;
            let userBusiness = new UserBusiness();
            userBusiness.delete(_id, (error, result) => {
                if(error) res.send({"error": error});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    find(req: express.Request, res: express.Response): void {
        try {

            let userBusiness = new UserBusiness();
            userBusiness.find((error, result) => {
                if(error) res.send({"error": error});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    findOne(req: express.Request, res: express.Response): void {
        try {

            let _id: string = req.params._id;
            let userBusiness = new UserBusiness();
            userBusiness.findOne(_id, (error, result) => {
                if(error) res.send({"error": error});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }


}
export default UserController;
