import IEntityModel from "./IEntityModel";
import IProductModel from "./IProductModel";


interface ICompanyModel extends IEntityModel {
    name: string;
    products: IProductModel[];
    password: string;
    clientId: string;
    refreshToken: string;
}

export default ICompanyModel;