import DataAccess from "../DataAccess";
import IUserModel from "../../models/interfaces/IUserModel";
import * as uuid from "uuid";
import * as bcrypt from 'bcryptjs';
import { Schema } from "mongoose";
import HandleError from "../../handlers/RequestError";


const mongoose = DataAccess.mongooseConnection;


const userSchema = new Schema({
    _id: {
        type: Schema.Types.String,
        default: uuid.v4(),
        index: true
    },
    firstname: {
        type: Schema.Types.String,
        required: true
    },
    lastname: {
        type: Schema.Types.String,
        required: true
    },
    login: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    clientId: {
        type: Schema.Types.String,
    },
    refreshToken: {
        type: Schema.Types.String,
    }
});


userSchema.pre<IUserModel>('save', function (next) {
    let user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) throw err;
            user.password = hash;
            next();
        });
    });


});



let schema = mongoose.model<IUserModel>("Users", userSchema);

export default schema;
