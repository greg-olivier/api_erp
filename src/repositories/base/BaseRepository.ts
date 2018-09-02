import { Model, Document } from "mongoose";
import DataAccess from "../../dataAccess/DataAccess";
import RequestError from "../../handlers/RequestError";
import IUserModel from "../../models/interfaces/IUserModel";
import UserModel from "../../models/UserModel";




const mongoose = DataAccess;

class BaseRepository<T extends Document> {

    protected _model: Model<Document>;


    constructor(schemaModel: Model<Document>) {
        this._model = schemaModel;
    }


    create(item: T): Promise<any> {
        return this._model.create(item);

    }

    find(): Promise<any[] > {
        return this._model.find().then(result =>  {
            if (result.length === 0)
                throw new RequestError('No result');
            else return result;
        })
    }

    update(_id: string, item: T) : Promise<T> {
        return this._model.update({ _id: _id }, item).then(result =>  {
            if (result.n === 0)
                throw new RequestError('Not found', _id);
            else return result;
        })
    }

    delete(_id: string): Promise<void> {
        return this._model.remove({ _id: _id }).then(result =>  {
            if (result.n === 0)
                throw new RequestError('Not found', _id);
            else return result;
        })
    }

    findById(_id: string): Promise<any> {
        return this._model.findById(_id)
    }


    findOne(q: object): Promise<any> {
        return this._model.find(q);
    }

}

export default BaseRepository;
