import { Mongoose, Connection } from 'mongoose';
import constant from "../../config/constants/Constants";

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose;
    static options: object = {
        autoIndex: false, // Don't build indexes
        reconnectTries: 10, // Never stop trying to reconnect
        reconnectInterval: 2000, // Reconnect every 2000ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6,
        useNewUrlParser: true
    };


    constructor() {
        DataAccess.connect();
    }

    static getMongoUri(): string{
        if (constant.db.user && constant.db.pwd)
            return 'mongodb://'+ constant.db.user + ':' + constant.db.pwd + '@' + constant.db.host + ':' + constant.db.port +'/' + constant.db.name;
        else
            return 'mongodb://'+ constant.db.host + ':' + constant.db.port +'/' + constant.db.name;
    }


    static connect(): Connection {
        if(this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection = new Mongoose();


        if (process.env.NODE_ENV === 'dev')
            this.mongooseConnection.set('debug',true);

        this.mongooseConnection.connection.once("connected", () => {
            console.log("Mongoose is connected on " + constant.db.name);
        });

        this.mongooseConnection.connection.on('error', function(err:Error){
            console.log("Error on mongoose connection : "+err +" on " + constant.db.name);
        });

        this.mongooseConnection.connection.on('reconnected', function () {
            console.log('Mongoose is reconnected to ' + constant.db.name);
        });

        this.mongooseConnection.connection.on('disconnected', function(){
            console.log("Mongoose is disconnected");
        });

        let connected = this.mongooseConnection;
        process.on('SIGINT', function(){
            connected.connection.close(function(){
                console.log("Mongoose default connection is disconnected due to application termination");
                process.exit(0);
            });
        });

        this.mongooseInstance = this.mongooseConnection.connect(this.getMongoUri(), this.options);
        return this.mongooseInstance;

    }

}
DataAccess.connect();
export default DataAccess;


