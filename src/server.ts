import app from "./app";
import {APP_HOST, APP_PORT} from "./config";

app.listen(APP_PORT, (err:any) => {
    if (err) throw err;
    console.log('App listening on ' + APP_HOST + ':' + APP_PORT);
    console.log('Press CTRL-C to stop\n');
});