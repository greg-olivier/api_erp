import UserModel from "../models/UserModel";
import IUserModel from "../models/interfaces/IUserModel";
import UserSchema from "../dataAccess/schemas/UserSchema";
import BaseRepository from "./base/BaseRepository";
import RequestError from "../handlers/RequestError";

class UserRepository  extends BaseRepository<IUserModel> {
    constructor () {
        super(UserSchema);
    }

    deleteProperties(_id: string, properties: object) : Promise<any> {
        return this._model.update({ _id: _id }, {$unset: properties})
    }
}

Object.seal(UserRepository);
export default UserRepository;