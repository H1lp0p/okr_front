import { RequestStatuses, requestStatusText, RequestTypes, requestTypeText } from "../../../types/request"
import BaseProps from "../../Base/BasePropsInterface"

import './Chips.css'

interface DateGroupProps extends BaseProps{
    start: Date
    end: Date
}

function DateGroup(props: DateGroupProps){
    const {start, end} = props
    
    const toStr = (date: Date) => {
        return `${date.getDate() < 10 ? "0" + date.getDate(): date.getDate()}.${date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()}.${date.getFullYear()}`
    }

    return (
        <div className={`w-25 d-flex flex-row justify-content-start align-items-center mt-1 ${props.className? props.className : ""}`}>
            <div className="date-chip">{toStr(start)}</div>
            <div className="date-chip">{toStr(end)}</div>
        </div>
    )
}

interface TypeChipProps{
    className?: string,
    type: RequestTypes,
    selected?: Boolean,
    onClick?: () => void
}

function TypeChip(props: TypeChipProps){

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
        <div
        onClick={() => {props.onClick ? props.onClick!() : null}} 
        className={`chip chip-${requestStyle(props.type)} ${props.className}`}>
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
        <div className={`chip chip-status ${props.className}`}>
            {requestStatusText(props.status)}
        </div>
    )
}

export {DateGroup, StatusChip, TypeChip}