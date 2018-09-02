import DataAccess from "../DataAccess";
import IProductModel from "../../models/interfaces/IProductModel";
import * as uuid from "uuid";
import{ Schema }from "mongoose";


const mongooseConnection = DataAccess.mongooseConnection;

class ProductSchema {

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
            price: {
                type: Schema.Types.Number,
                required: true
            },
            stock: {
                type: Schema.Types.Number,
            },
            description: {
                type: Schema.Types.String
            },
            imgs: [{
                type: Schema.Types.String
            }],
            owner: {
              type: Schema.Types.String,
              ref: "Users",
              required: "true"
            }
        });


    }

}
let schema = mongooseConnection.model<IProductModel>("Products", ProductSchema.schema);
export default schema;
