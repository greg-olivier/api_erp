import { Document } from "mongoose";


interface IUserModel extends Document {
    _id: string,
    createdAt: Date;
    modifiedAt: Date;

}

export default IUserModel;