import * as http from 'http';
import constant from "./config/constants/Constants";
import app from './App';


class Server {

    private static serverInstance: Server;
    private server: any;
    private port: number;

    public getServerInstance(): any {
        return this.server;
    }

    public static bootstrap(): Server {
        if (!this.serverInstance) {
            this.serverInstance = new Server();
            return this.serverInstance;
        } else {
            return  this.serverInstance;
        }
    }

    public constructor() {
        this.runServer();
    }

    private runServer(): void {
        this.port = constant.app.port;
        app.set('port', this.port);
        this.createServer();
    }

    private createServer() {
        this.server = http.createServer(app);
        this.server.listen(this.port);

        this.server.on('listening', () => {
            let address = this.server.address();
            let bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;
            console.log('API listen on ' + bind);
        });

        this.server.on('error', (error: NodeJS.ErrnoException) => {
            if (error.syscall !== 'listen') throw error;
            console.error(error);
            process.exit(1);
        });
    }


}

export const server = Server.bootstrap();
