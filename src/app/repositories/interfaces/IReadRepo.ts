interface IReadRepo<T> {
    find:(callback: (error: any, result: any)=> void)=> void;
    findOne: (id: string, callback: (error:any, result: T) => void) => void;
}

export default IReadRepo;