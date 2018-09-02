import UserRepository from "../repositories/UserRepository";
import IBaseService from "./interfaces/IBaseService";
import IUserModel from "../models/interfaces/IUserModel";
import UserModel from "../models/UserModel";
import RequestError from "../handlers/RequestError";


class UserService  implements IBaseService<IUserModel> {
    private _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository();
    }

    findByEmail(user: IUserModel): Promise<IUserModel> {
        return this._userRepository.findOne({email: user.email})
        .then(result => {
            console.log(result);
            return result[0];
        })
    }

    create(item: IUserModel): Promise<IUserModel> {
        return this._userRepository.create(item);
    }

    find(): Promise<IUserModel[]> {
        return this._userRepository.find();
    }

    update(_id: string, item: IUserModel): Promise<any> {
        return this._userRepository.update(_id, item)
    }

    deleteProperties(_id: string, properties: object) {
        return this._userRepository.deleteProperties(_id, properties)
    }


    delete(_id: string): Promise<any> {
        return this._userRepository.delete(_id).catch(err => {
            throw err;
        });
    }

    findOne(q: object): Promise<IUserModel> {
        return this._userRepository.findOne(q)
            .then(result => {
                return result[0];
            })

    }

    findById(_id: string): Promise<IUserModel> {
        return this._userRepository.findById(_id)
            .then(result => {
                console.log(result);
                return result[0];
            })

    }
}


Object.seal(UserService);
export default UserService;