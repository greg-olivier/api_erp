class AuthenticationError extends Error {
    private _name: string;
    public target: string | object;

    constructor(message: string, target?: string){
        super(message);
        this._name = 'AuthenticationError';
        this.target = target;

    }

}

export default AuthenticationError;