import * as express from "express";
import AuthService from "../services/AuthService";
import IBaseController from "./interfaces/base/IBaseController";
import IUserModel from "../models/interfaces/IUserModel";
import HandleError from "../handlers/RequestError";
import jwt from "../tools/Token";
import ValidationError from "../handlers/ValidationError";
import ErrorController from './ErrorController';


class AuthController {

  welcome(req: express.Request, res: express.Response): void {
    res.status(200);
    res.json({success: true, message: "Welcome to our Api"});
  }

  login(req: express.Request, res: express.Response): void {

    let user: IUserModel = <IUserModel>req.body;
    let authService = new AuthService();
    //const re = /\S+@\S+\.\S+/;

    if (!user.login || !user.password) {
      res.status(400);
      res.json({success: false, message: "Login or password not provided"});
    }

    authService.login(user)
    .then(result => {
      res.status(200);
      res.json({success: true, data: result});
    })
    .catch(err => {
      let error = new ErrorController().format(err);
      res.status(200);
      console.error(error);
      res.json({
        success: false,
        error: error
      });
    });



  }

  register(req: express.Request, res: express.Response): void {
    let user: IUserModel = <IUserModel>req.body;
    let authService = new AuthService();
    authService.register(user)
    .then((result: IUserModel) => {
      res.json({success: true, data: result})
    })
    .catch((err) => {
      console.log(err.stack);
      res.json({
        success: false,
        error: {
          type: ( err.type || err.name || ''),
          target:  (err.target || ''),
          message: err.message
        }
      });
    });


  }


  refresh(req: express.Request, res: express.Response): void {

    jwt.extract(req.headers['authorization']).then( token => {
      let authService = new AuthService();
      authService.refresh(token, req.body.clientId, req.body.refreshToken)
      .then(result => {
        res.send({success: true, data: result});
      })
      .catch(err => {
        //console.error(err);
        res.json({success: false, message: err.message});
      });
    }).catch(err => {
      //console.error(err);
      res.json({success: false, message: err.message});
    });


  }

  logout(req: express.Request, res: express.Response): void {
    jwt.extract(req.headers['authorization']).then( token => {
      let authService = new AuthService();
      authService.logout(token)
      .then(result => {
        res.send({"success": true});
      })
      .catch(err => {
        console.error(err);
        res.send({"error": err.name + ": " + err.message});
      });
    })
  }


}

export default AuthController;
