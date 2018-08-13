import IUserModel from "./interfaces/IUserModel";

class UserModel {

    private _userModel: IUserModel;

    constructor(userModel: IUserModel) {
        this._userModel = userModel;
    }
    get name (): string {
        return this._userModel.name;
    }

    get email (): string {
        return this._userModel.email;
    }

    get password (): string {
        return this._userModel.password;
    }

    get clientId (): string {
        return this._userModel.clientId;
    }

    get refreshToken (): string {
        return this._userModel.refreshToken;
    }

}
Object.seal(UserModel);
export default UserModel;