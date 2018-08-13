import * as nconf from "nconf";

class Constant {

    // Default settings if no json config file
    private default: object = {
        app: {
            port: 3000,
            host: "localhost"
        },
        db: {
            port: 27017,
            host: "localhost",
            name: "mongodb"
        },
        jwt: {
            secret: "secret_key",
            alg: "HS256"
        }
    };


    // Load Environnment variables
    constructor() {
        nconf.argv().env({separator: '.'});
        let environment = nconf.get('NODE_ENV') || 'default';
        nconf.file(environment, {file: __dirname + '/../env/' + environment.toLowerCase() + '.json'}).defaults(this.default);
    };

    // Get a env variable
    public get(key?: string) {
        return nconf.get(key);
    };

}

export default new Constant().get();




