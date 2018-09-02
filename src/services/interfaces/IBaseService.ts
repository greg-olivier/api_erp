interface IBaseService<T> {
    find: () => Promise<T[]>;
    findById: (_id: string) => Promise<T>;
    create: (item: T) => Promise<T>;
    update:(_id: string, item: T) => Promise<T>;
    delete: (_id: string) => Promise<T>;
}
export default IBaseService;