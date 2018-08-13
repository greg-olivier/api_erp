import { Model, Document, Collection, Types } from "mongoose";
import IReadRepo from "../interfaces/IReadRepo";
import IWriteRepo from "../interfaces/IWriteRepo";
import DataAccess from "./../../dataAccess/DataAccess";



const mongoose = DataAccess;

class RepositoryBase<T extends Document> implements IReadRepo<T>, IWriteRepo<T> {

    private _model: Model<Document>;


    constructor(schemaModel: Model<Document>, collectionName: string) {
        this._model = schemaModel;
    }


    create(item: T, callback: (error: any, result: Document[]) => void) {
        this._model.create(item, callback);

    }

    find(callback: (error: any, result: Document[]) => void) {
        this._model.find({}, callback)
    }

    update(_id: string, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: _id }, (err) => callback(err, null));
    }

    findOne(_id: string, callback: (error: any, result: T) => void) {
        this._model.findById(_id, callback);
    }

}

export default RepositoryBase;
