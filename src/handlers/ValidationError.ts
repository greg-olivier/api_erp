class ValidationError extends Error {
    private _name: string;
    public target: string;

    constructor(target: string, message: string){
        super(message);
        this._name = 'ValidationError';
        this.target = target;

    }

}

export default ValidationError;