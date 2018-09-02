class RequestError extends Error {
    private _name: string;
    public target: string | object;

    constructor(message: string, target?: string|object){
        super(message);
        this._name = 'RequestError';
        this.target = target;

    }

}

export default RequestError;