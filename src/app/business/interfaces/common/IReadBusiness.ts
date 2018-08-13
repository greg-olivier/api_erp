interface IReadBusiness<T> {
    find: (callback: (error: any, result: T)=> void)=> void ;
    findOne: (_id: string, callback: (error:any, result: T) => void) => void;

}

export default IReadBusiness;