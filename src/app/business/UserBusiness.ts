import UserRepository from "./../repositories/UserRepository";
import IUserBusiness from "./interfaces/IUserBusiness";
import IUserModel from "./../models/interfaces/IUserModel";
import UserModel from "./../models/UserModel";


class UserBusiness  implements IUserBusiness {
    private _userRepository: UserRepository;

    constructor () {
        this._userRepository = new UserRepository();
    }

    create (item: IUserModel, callback: (error: any, result: any) => void) {
        this._userRepository.create(item, callback);
    }

    find(callback: (error: any, result: any) => void) {
        this._userRepository.find(callback);
    }

    update (_id: string, item: IUserModel, callback: (error: any, result: any) => void) {

        this._userRepository.findOne(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._userRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._userRepository.delete(_id , callback);
    }

    findOne (_id: string, callback: (error: any, result: IUserModel) => void) {
        this._userRepository.findOne(_id, callback);
    }

}


Object.seal(UserBusiness);
export default UserBusiness;