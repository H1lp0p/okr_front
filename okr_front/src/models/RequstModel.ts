import { RequestStatuses, RequestTypes } from "../types/request"
import Attachment from "./Attachmet"

class RequestInfoModel{
    id: string
    beginDate: Date
    endDate: Date
    attachments: Attachment[]

    requestStatus: RequestStatuses
    requestType: RequestTypes

    studentName: string
    groupList: string[]

    constructor(
        id: string,
        begin_date: Date,
        end_date: Date,
        attachments: Attachment[],
        students_name: string,
        groups: string[],
        requestStatus: RequestStatuses,
        requestType: RequestTypes
    ){
        this.id = id
        this.beginDate = begin_date
        this.endDate = end_date
        this.attachments = attachments

        this.studentName = students_name
        this.groupList = groups 

        this.requestStatus = requestStatus
        this.requestType = requestType
    }
}

export default RequestInfoModel