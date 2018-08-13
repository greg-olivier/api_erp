import * as mongoose from "mongoose";
import { Types } from "mongoose";

interface IUserModel extends mongoose.Document {
    _id: string,
    name: string;
    email: string;
    password: string;
    clientId: string;
    refreshToken: string;
}

export default IUserModel;