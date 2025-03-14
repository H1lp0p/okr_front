import Attachment from "../../../models/Attachmet";
import RequestInfoModel from "../../../models/RequstModel";
import { RequestTypes } from "../../../types/request";
import { Roles } from "../../../types/user";
import BaseProps from "../../Base/BasePropsInterface";
import CustomInput from "../../inputs/CustomInput";
import { StatusChip, TypeChip } from "../chips/Chips";

interface RequestFullProps extends BaseProps{
    isEditable?: boolean,
    isNew?: boolean,
    request?: RequestInfoModel,
    roles?: Roles[],
    changeRequest?: (newRequest: RequestInfoModel) => {}
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

    const addFile = () => {}

    const prolonge = () => {}

    const createNewRequest = () => {}

    const setType = () => {}

    const setStatus = () => {}

    const check = () => {}

    const editStartDate = () => {}

    const onChange = () => {}

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
                            <div className="input-group w-100 p-4 d-flex dlex-row">
                                <CustomInput
                                    inputType="date"
                                    placehodler="дата начала"
                                    className="flex-grow-1"
                                    classAttr={`form-control ${requestStyle(request.requestType)}`}
                                    onChange={editStartDate}
                                />
                                <CustomInput
                                    inputType="date"
                                    placehodler="дата начала"
                                    className="flex-grow-1"
                                    classAttr={`form-control ${requestStyle(request.requestType)}`}
                                    onChange={prolonge}
                                />
                            </div>
                            <div className="form-check w-100 p-4 mx-4">

                                <input type='checkbox' className="form-check-input check-big" id="check" onChange={(e) => {check()}}/>
                                
                                <label className="form-check-label h3" htmlFor="check">Документ в деканате</label>
                            </div>

                            <div 
                                className={`${requestStyle(request.requestType)}-dashed h-25 d-flex rounded justify-content-center align-items-center m-2 p-4`}
                            >

                                Добавить файл
                            </div>
                            <div style={{overflowY: 'scroll'}}>
                                {request.attachments.map((el, it) => {
                                    return <AttachmentInfo className={requestStyle(request.requestType)} attachment={el} key={`${request.id}_attachment_${it}`}/>
                                })}
                            </div>
                        </form>
                    </div>
                }
            </div>
    )
}

interface AttachmentProps extends BaseProps{
    attachment: Attachment,
}

function AttachmentInfo (props: AttachmentProps){


    return (
        <div 
        className={`rounded d-flex justify-content-between align-items-center p-3 m-2 ${props.className}`}
         style={{
            border: '2px solid gray'
         }}>
            
        <span>{props.attachment.fileName}</span>
        <div className="d-flex flex-column justify-content-center align-items-center">
            <span>добавлен</span>
            <div className={`chip-${props.className} rounded`}>{props.attachment.date?.toDateString()}</div>
        </div>
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