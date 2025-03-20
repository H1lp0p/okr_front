import { data } from "react-router-dom";
import Attachment from "../../../models/Attachmet";
import RequestInfoModel from "../../../models/RequstModel";
import { RequestStatuses, requestStatusText, RequestTypes } from "../../../types/request";
import { Roles } from "../../../types/user";
import BaseProps from "../../Base/BasePropsInterface";
import CustomInput from "../../inputs/CustomInput";
import { StatusChip, TypeChip } from "../chips/Chips";


import { EventHandler, useCallback, useEffect, useState } from "react";
import RequestInfo from "../requestInfo/RequestInfo";
import { useDropzone } from "react-dropzone";

import './RequestFull.css'

interface RequestFullProps extends BaseProps{
    isNew?: boolean,
    maxUserRole?: Roles.student | Roles.worker
    request: RequestInfoModel,
    roles?: Roles[],
    changeRequest?: (newRequest: RequestInfoModel) => void
}

function RequestFull(props: RequestFullProps){

    const {request} = props

    const isNew = props.isNew
    
    const copy = (request: RequestInfoModel) => {
        return new RequestInfoModel(
            request.id,
            request.beginDate,
            request.endDate,
            request.attachments,
            request.studentName,
            request.groupList,
            request.requestStatus,
            request.requestType
        )
    }
    

    const role = props.maxUserRole ? props.maxUserRole : Roles.student

    //NEW VERSION OF REQUEST
    const [newRequest, setNewRequest] = useState(request) 

    const [isEdited, setEdited] = useState(false)

    const [CheckStatus, setCheckStatus] = useState(request? request.isDocInCabinet : false)

    const dropFileCallback = useCallback((acceptedFiles : File[]) => {
        acceptedFiles.forEach((val, ind) => {
            console.log(val.name);
        })
        //!!!NEW ATTACHMENT
        let newAttachments = acceptedFiles.map((el) => {
            return new Attachment(el.name, new Date(), el, "-1")
        })

        let temp = copy(newRequest)
        temp.attachments = [...newAttachments, ...temp.attachments]
        setNewRequest(temp)

    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop: dropFileCallback})

    useEffect(() => {
        setNewRequest(request)
        setEdited(false)
    }, [request])

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

    const typeCycle = [
        RequestTypes.sick,
        RequestTypes.family,
        RequestTypes.trip
    ]

    const requestClassName = requestStyle(newRequest.requestType)

    const setType = () => {
        let temp = copy(newRequest)
        temp.requestType = typeCycle[(typeCycle.indexOf(newRequest.requestType) + 1) % typeCycle.length]

        let edited = temp.requestType != request.requestType

        setEdited(edited)

        setNewRequest(temp)
    }

    const editDate = (start: Date, end: Date) => {
        let temp = copy(request!)
        
        temp.beginDate = start
        temp.endDate = end

        let edited = temp.beginDate != request.beginDate || temp.endDate != request.endDate

        setEdited(edited)

        setNewRequest(temp)
    }

    const editisDocInCabinet = (event: React.ChangeEvent<HTMLInputElement>) => {
        let temp = copy(newRequest)
        temp.isDocInCabinet = event.target.checked

        let edited = temp.isDocInCabinet != request.isDocInCabinet

        setEdited(edited)

        setNewRequest(temp)
    }

    const setStatus = (newStatus: RequestStatuses) => {
        let temp = copy(newRequest)
        temp.requestStatus = newStatus

        let edited = temp.requestStatus == request.requestStatus

        setEdited(edited)

        setNewRequest(temp)
    }

    const dateToValue = (date: Date) => {
        return `${date.getFullYear()}-${date.getMonth() < 10? `0${date.getMonth()}` : date.getMonth()}-${date.getDate() < 10? `0${date.getDate()}` : date.getDate()}`
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (props.changeRequest){
            props.changeRequest(newRequest)
        }
    }

    return (
        <form onSubmit={onSubmit} className={`d-flex flex-column ${props.className}`}>
            <div className={`m-2 p-2 card-view`}>
                <div className={`rounded request-full w-100 pe-3 ${requestClassName}`} style={{overflowY: "scroll", overflowX: 'clip', height: "60vh"}}>

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
                            type={newRequest.requestType}
                            onClick={role == Roles.worker || isNew ? () => {setType()} : undefined}
                        />
                    </div>

                    <div className="input-group w-100 p-4 d-flex dlex-row">
                            
                            <span className={`input-group-text ${role != Roles.worker ? 'disabled' : '' } ${requestClassName}`}>Начало</span>
                            <input
                                id={`edit-request-startDate`}
                                name={'startDate'}
                                onChange={(e) => {
                                    editDate(new Date(e.target.value), newRequest.endDate)
                                }}
                                defaultValue={dateToValue(newRequest.beginDate)}
                                className={`form-control ${requestClassName}`}
                                type="date"
                            />
                            <span className={`input-group-text ${requestClassName}`}>Конец</span>
                            <input
                                id={`edit-request-endtDate`}
                                onChange={(e) => {
                                    editDate(newRequest.beginDate, new Date(e.target.value))
                                }}
                                defaultValue={dateToValue(newRequest.endDate)}
                                className={`form-control ${requestClassName}`}
                                type="date"
                            />
                        </div>
                    
                    <div className="form-check w-100 p-4 mx-4">

                        <input type='checkbox' checked={newRequest.isDocInCabinet} onChange={editisDocInCabinet} className={`form-check-input check-${requestClassName}`} id="check"/>
                        <label className="form-check-label" htmlFor="check">Документ в деканате</label>
                    </div>

                    <div className={`w-100 px-5 my-3 d-flex justify-content-between ${role != Roles.worker ? "d-none" : ''}`}>
                        <input id="radio-check-status-1" type="radio" name="request_radio_status" className={`btn-check`} onChange={() => {setStatus(RequestStatuses.denied)}}></input>
                        <label htmlFor="radio-check-status-1" className={`btn btn-radio-${requestClassName}`}>{requestStatusText(RequestStatuses.denied)}</label>

                        <input id="radio-check-status-2" type="radio" name="request_radio_status" className={`btn-check`} onChange={() => {setStatus(RequestStatuses.inQueue)}}></input>
                        <label htmlFor="radio-check-status-2" className={`btn btn-radio-${requestClassName}`}>{requestStatusText(RequestStatuses.inQueue)}</label>

                        <input id="radio-check-status-3" type="radio" name="request_radio_status" className={`btn-check`} onChange={() => {setStatus(RequestStatuses.approved)}}></input>
                        <label htmlFor="radio-check-status-3" className={`btn btn-radio-${requestClassName}`}>{requestStatusText(RequestStatuses.approved)}</label>    
                    </div>

                    <div {...getRootProps()} className={`${role != Roles.student ? "d-none" : ""} ${requestClassName}${!isDragActive ? "-dashed" : ""} d-flex rounded justify-content-center align-items-center m-2 p-4`}>
                        Добавить файл
                        <input {...getInputProps()} defaultValue={[]}/>
                    </div>

                    <div>
                    {newRequest.attachments.map((el, it) => {
                            return <AttachmentInfo className={requestClassName} isNew={true} attachment={el} key={`new_${request.id}_attachment_${it}`}/>
                        })}
                    </div>
                    
                </div>
            </div>

            <button type="submit" className={`m-2 btn btn-lg align-self-bottom ${!isEdited ? "disabled" : ""}`}>Сохранить</button>
        </form>
    )
}

interface AttachmentProps extends BaseProps{
    attachment: Attachment,
    isNew? : boolean
}

function AttachmentInfo (props: AttachmentProps){

    const {date, file, fileName} = props.attachment
    const isNew = props.isNew ? props.isNew : false

    const toStr = (date: Date) => {
        return `${date.getDate() < 10 ? "0" + date.getDate(): date.getDate()}.${date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()}.${date.getFullYear()}`
    }

    return (
        <div 
        className={`rounded d-flex justify-content-between align-items-center p-3 m-2 ${props.className}`}
         style={{
            border: '2px solid gray'
         }}>
            
            <span>{fileName}</span>
            <div className="d-flex flex-row justify-content-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    {date && 
                        <>
                            <span>добавлен</span>
                            <div className={`chip-${props.className} rounded`}>{toStr(date)}</div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default RequestFull