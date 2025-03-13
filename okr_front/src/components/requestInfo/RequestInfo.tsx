import RequestInfoModel from "../../models/RequstModel";
import { RequestStatuses, RequestTypes, requestTypeText } from "../../types/request";

import './RequestInfo.css'

interface RequestInfoProps{
    request: RequestInfoModel
}

function RequestInfo(props: RequestInfoProps) {
    const {request} = props

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
        <div className={`container d-block rounded ${requestStyle(request.requestType)}`}>
            <div className="d-flex flex-row">
                <div className="d-blok flex-grow-1">
                    <div>
                        {request.studentName}
                    </div>
                    <div>
                        {request.groupList.join("; ")}
                    </div>
                </div>
                <div className="">
                    <TypeChip
                        className= "d-inline"
                        type={request.requestType}
                    />
                    <StatusChip
                        className="d-inline"
                        status={request.requestStatus}
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

interface DateGroupProps{
    start: Date
    end: Date
}

function DateGroup(props: DateGroupProps){
    const {start, end} = props
    
    const toStr = (date: Date) => {
        return `${date.getDate() < 10 ? "0" + date.getDate(): date.getDate()}.${date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()}.${date.getFullYear()}`
    }

    return (
        <div className="">
            <div className="d-inline date-badge">{toStr(start)}</div>
            <div className="d-inline date-badge">{toStr(end)}</div>
        </div>
    )
}

interface TypeChipProps{
    className?: string,
    type: RequestTypes,
    selected?: Boolean
}

function TypeChip(props: TypeChipProps){
    return (
        <div className={props.className}>
            {requestTypeText(props.type)}
        </div>
    )
}

interface StatusChipProps{
    className?: string,
    status: RequestStatuses
}

function StatusChip(props: StatusChipProps){
    return (
        <div className={props.className}>
            {props.status}
        </div>
    )
}

export default RequestInfo