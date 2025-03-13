import RequestInfoModel from "../../../models/RequstModel";
import { RequestTypes } from "../../../types/request";
import { Roles } from "../../../types/user";
import BaseProps from "../../Base/BasePropsInterface";
import Input from "../../inputs/input";
import { StatusChip, TypeChip } from "../chips/Chips";

interface RequestFullProps extends BaseProps{
    isEditable?: boolean,
    isNew?: boolean,
    request?: RequestInfoModel,
    roles?: Roles[]
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
                            <div className="w-100 p-5 d-flex flex-row justify-content-between">
                                <div>
                                    <div className="h2">
                                        {request.studentName}
                                    </div>
                                    <div className="h3 text-secondary">
                                        {request.groupList.join("; ")}
                                    </div>
                                </div>
                                <TypeChip
                                    className="align-items-center align-self-center"
                                    type={request.requestType}
                                />
                            </div>
                            <div className="input-group p-4">
                                <Input
                                    inputType="date"
                                    placehodler="Начальная дата"
                                    classAttr=""
                                />
                            </div>
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