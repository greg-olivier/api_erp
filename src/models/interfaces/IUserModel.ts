import IEntityModel from "./IEntityModel";

interface IUserModel extends IEntityModel {
    firstname: string;
    lastname: string;
    login: string;
    email: string;
    password: string;
    clientId: string;
    refreshToken: string;
}

export default IUserModel;