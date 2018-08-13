import IReadController from "./../common/IReadController";
import IWriteController from "./../common/IWriteController";
import IBaseBusiness from "../../../app/business/interfaces/base/IBaseBusiness";

interface IBaseController<T extends IBaseBusiness<Object>> extends IReadController, IWriteController{


}
export default IBaseController;