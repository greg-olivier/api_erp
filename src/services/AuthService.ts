import IUserModel from "../models/interfaces/IUserModel";
import UserService from "./UserService";
import * as bcrypt from "bcryptjs";
import jwt, {IToken} from '../tools/Token'
import * as uuid from "uuid";
import * as crypto from "crypto";
import HandleError, {default as RequestError} from "../handlers/RequestError";
import ValidationError from "../handlers/ValidationError";
import AuthenticationError from "../handlers/AuthenticationError";


class AuthService {
    private _userService: UserService;
    private _data: {
        token?: string,
        clientId: string,
        refreshToken: string
    };

    constructor() {
        this._userService = new UserService();
        this._data = {
            clientId: uuid.v4(),
            refreshToken: crypto.randomBytes(16).toString("hex")
        }
    }

    login(user: IUserModel): Promise<any> {
        let candidate = user;
        return this._userService.findOne({login:candidate.login}).then((userDb: IUserModel) => {
            if (!userDb)
                throw new AuthenticationError('Email or password incorrect');
            else return bcrypt.compare(candidate.password, userDb.password).then(res => {
                if (!res) throw new AuthenticationError('Email or password incorrect');
                return jwt.sign(userDb).then(token => {
                    this._data.token = token;
                    userDb.clientId = this._data.clientId;
                    userDb.refreshToken = this._data.refreshToken;
                    return this._userService.update(userDb._id, userDb).then((res: any) => {
                        return this._data;
                    })
                })
            })
            });

    }


    register(user: IUserModel): Promise<IUserModel> {

        return this._userService.findOne({login: user.login}).then(res => {
            if (res) throw new ValidationError('Login', 'already exists');
            else return this._userService.findOne({email: user.email}).then(res => {
                if (res) throw new ValidationError('Email', 'already exists');
                else return this._userService.create(user);
            })
        })
    }


    refresh(token: string, clientId: string, refreshToken: string): Promise<any> {
        return jwt.verify(token).then((res: IToken) => {
            return this._userService.findOne({
                _id: res.sub,
                clientId: clientId,
                refreshToken: refreshToken
            }).then((userDb) => {
                return jwt.sign(userDb).then(token => {
                    this._data.token = token;
                    userDb.clientId = this._data.clientId;
                    userDb.refreshToken = this._data.refreshToken;
                    return this._userService.update(userDb._id, userDb).then((res: any) => {
                        return this._data;
                    })
                })
            })

        })

    }

    logout(token: string): Promise<any> {
        return jwt.verify(token).then((res: IToken) => {
            return this._userService.deleteProperties(res.sub, {clientId: '', refreshToken: ''}).then(result =>  {
                if (result.n === 0)
                    throw new AuthenticationError('Subject not found');
                else return result;
            })
        })
    }

}


Object.seal(AuthService);
export default AuthService;
