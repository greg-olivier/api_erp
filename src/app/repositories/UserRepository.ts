import UserModel from "./../models/UserModel";
import IUserModel from "./../models/interfaces/IUserModel";
import UserSchema from "./../dataAccess/schemas/UserSchema";
import BaseRepository from "./base/BaseRepository";

class UserRepository  extends BaseRepository<IUserModel> {
    constructor () {
        super(UserSchema, "users");
    }
}

Object.seal(UserRepository);
export default UserRepository;