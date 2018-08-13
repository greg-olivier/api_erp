import DataAccess from "./../DataAccess";
import IUserModel from "./../../models/interfaces/IUserModel";
import * as uuid from "uuid";

const mongooseConnection = DataAccess.mongooseConnection;

class UserSchema {

    static get schema () {
        return new mongooseConnection.Schema({
            _id:{
                type: String,
                default: uuid.v4,
                index: true
            },
            name : {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            clientId: {
                type: String,
            },
            refreshToken: {
                type:String,
            }
        });


    }

}
let schema = mongooseConnection.model<IUserModel>("Users", UserSchema.schema);
export default schema;