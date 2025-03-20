import { ReactElement, useState } from "react";
import RequestInfoModel from "../../../models/RequstModel";
import { RequestStatuses, requestStatusText, RequestTypes, requestTypeText } from "../../../types/request";
import BaseProps from "../../Base/BasePropsInterface";

import './RequestInfo.css'
import { DateGroup, StatusChip, TypeChip } from "../chips/Chips";

interface RequestInfoProps extends BaseProps{ 
    request: RequestInfoModel,
    selectedId: string,
    onSelect?: (request: RequestInfoModel) => void
}

function RequestInfo(props: RequestInfoProps) {
    const {request, selectedId} = props

    let trowRequest = props.onSelect ? props.onSelect : (request: RequestInfoModel) => {}

    const requestStyle = (type: RequestTypes, selected = "") => {
        switch(type) {
            case RequestTypes.sick:
                return "type-sick" + (selected == request.id ? "-filled" : "")
            case RequestTypes.family:
                return "type-family" + (selected == request.id ? "-filled" : "")
            case RequestTypes.trip:
                return "type-trip" + (selected == request.id ? "-filled" : "")
        }
    }

    const select = () => {
        trowRequest(request)
    }

    return (
        <div 
            className={`m-2 p-2 d-flex flex-column rounded request-info ${requestStyle(request.requestType, selectedId)}`} 
            id={props.id}
            onClick={() => {select()}}>

            <div className="d-flex flex-sm-row flex-column justify-content-between">
                <div className="d-blok">
                    <div>
                        {request.studentName}
                    </div>
                    <div className="text-secondary">
                        {request.groupList.join("; ")}
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-end flex-grow-1">
                    
                    <StatusChip
                        className={`d-inline me-2`}
                        status={request.requestStatus}
                    />
                    
                    <TypeChip
                        className= {`d-inline`}
                        type={request.requestType}
                    />
                </div>
            </div>
            <DateGroup
                start={request.beginDate}
                end={request.endDate}
            />
        </div>
    )
}



export default RequestInfo