class ErrorController {

    format(err: any){
        let error: any = {};
        Object.getOwnPropertyNames(err).forEach(function (key) {
            if (key != 'stack')
                error[key] = err[key];
        }, this);
        return error;

    }

}


export default ErrorController;
