import DataAccess from "../DataAccess";
import ICompanyModel from "../../models/interfaces/ICompanyModel";
import * as uuid from "uuid";
import{ Schema }from "mongoose";


const mongooseConnection = DataAccess.mongooseConnection;

class CompanySchema {

    static get schema () {
        return new mongooseConnection.Schema({
            _id:{
                type: Schema.Types.String,
                default: uuid.v4(),
                index: true
            },
            name : {
                type: Schema.Types.String,
                required: true
            },
            owner: {
                type: Schema.Types.String,
                ref: "Users",
                required: true
            },
            products: [{
                type: Schema.Types.String,
                ref: "Products"
            }],
        });


    }

}
let schema = mongooseConnection.model<ICompanyModel>("Companies", CompanySchema.schema);
export default schema;
