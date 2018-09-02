import IEntityModel from "./IEntityModel";

interface IProductModel extends IEntityModel {
    name: string;
    price: string;
    stock: string;
    description: string;
    imgs: string[];
}

export default IProductModel;