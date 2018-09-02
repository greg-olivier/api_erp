import * as jsonwebtoken from 'jsonwebtoken';
import constants from "../config/constants/Constants";
import IUserModel from "../models/interfaces/IUserModel";
import {Request} from "express";
import HandleError from "../handlers/RequestError";

export interface IToken {
    sub: string,
    iat: number,
    exp: number
}

const opts = {
    algorithm: constants.jwt.alg
};

const jwt = {
    sign : async (user: IUserModel, expire?: number) => {
        let payload = {
            sub: user.login,
            iat: Math.floor(Date.now()/1000),
            exp: (expire) ? expire : Math.floor(Date.now()/1000) + constants.jwt.expire
        };
        return await jsonwebtoken.sign(payload, constants.jwt.secret, opts);
    },
    verify: async (token: string) => {
        let payload = await <IToken>jsonwebtoken.verify(token, constants.jwt.secret, {algorithms: [opts.algorithm]});
        if (payload.exp < Math.floor(Date.now()/1000)) throw new HandleError('token expired');
        return await payload;
    },
    extract: async (headerAuth: string) => {
        if (!headerAuth) throw new HandleError('No token provided');
           return await headerAuth.split('Bearer ' || 'Basic ')[1];
    }
};

export default jwt;





