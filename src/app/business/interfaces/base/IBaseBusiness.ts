import IReadBusiness from "../common/IReadBusiness";
import IWriteBusiness from "../common/IWriteBusiness";

interface IBaseBusiness<T> extends IReadBusiness<T>, IWriteBusiness<T> {
}
export default IBaseBusiness;