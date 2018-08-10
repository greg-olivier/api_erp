import app from "./app";
import config from "./config";

app.listen(config.app.port, config.app.post, (err:any) => {
    if (err) throw err;
    console.log('App listening on ' + config.app.host + ':'+ config.app.port);
    console.log('Press CTRL-C to stop\n');
});