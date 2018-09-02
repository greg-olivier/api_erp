import IReadController from "./../common/IReadController";
import IWriteController from "./../common/IWriteController";
import IBaseService from "../../../services/interfaces/IBaseService";

interface IBaseController<T extends IBaseService<Object>> extends IReadController, IWriteController{


}
export default IBaseController;