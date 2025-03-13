import RequestInfoModel from "../../../models/RequstModel";
import { RequestTypes } from "../../../types/request";
import BaseProps from "../../Base/BasePropsInterface";
import { StatusChip, TypeChip } from "../chips/Chips";

interface RequestFullProps extends BaseProps{
    isEditable?: boolean
    request?: RequestInfoModel
}

function RequestFull(props: RequestFullProps){

    const {isEditable, request} = props

    const requestStyle = (type: RequestTypes) => {
        switch(type) {
            case RequestTypes.sick:
                return "type-sick"
            case RequestTypes.family:
                return "type-family"
            case RequestTypes.trip:
                return "type-trip"
        }
    }

    return (
        //flex-grow-1 card-view align-self-stretch p-2
        <div className={`${props.className}`}>
                {!request && <PlaceHolder/>}
                {request && 
                    <div className={`rounded h-100 w-100 ${requestStyle(request.requestType)}`}>
                        <form>
                            <StatusChip
                                status={request.requestStatus}
                            />
                            <TypeChip
                                type={request.requestType}
                            />
                        </form>
                    </div>
                }
            </div>
    )
}

const PlaceHolder = () => {
    return (
        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
            {"Выберите запрос"}
        </div>
    )
}

export default RequestFull