enum RequestTypes{
    family = "FAMILY",
    sick = "SICK",
    trip = "EVENT_TRIP"
}

enum RequestStatuses{
    approved = "APPROVED",
    inQueue = "IN_QUEUE",
    denied = "DENIED"
}

const toStatus = (str: string) => {
    switch (str){
        case RequestStatuses.approved: {
            return RequestStatuses.approved
        }
        case RequestStatuses.inQueue: {
            return RequestStatuses.inQueue
        }
        case RequestStatuses.denied: {
            return RequestStatuses.denied
        }
        default: {
            return RequestStatuses.inQueue
        }
    }
}

const toType = (str: string) => {
    switch (str){
        case RequestTypes.family: {
            return RequestTypes.family
        }
        case RequestTypes.sick: {
            return RequestTypes.sick
        }
        case RequestTypes.trip: {
            return RequestTypes.trip
        }
        default: {
            return RequestTypes.sick
        }
    }
}

const requestTypeText = (type: RequestTypes) => {
    switch (type){
        case RequestTypes.sick:
            return "болеет"
        case RequestTypes.family:
            return "семейные"
        case RequestTypes.trip:
            return "командировка"
    }
}

const requestStatusText = (status: RequestStatuses) => {
    switch (status){
        case RequestStatuses.approved:
            return "подтверждено"
        case RequestStatuses.denied:
            return "отклонено"
        case RequestStatuses.inQueue:
            return "в очереди"
    }
}

export {
    RequestTypes,
    RequestStatuses,
    requestTypeText,
    requestStatusText,
    toStatus,
    toType
}