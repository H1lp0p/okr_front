enum RequestTypes{
    family = "Family",
    sick = "Sick",
    trip = "EventTrip"
}

enum RequestStatuses{
    approved = "approved",
    inQueue = "inQueue",
    denied = "denied"
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

export {
    RequestTypes,
    RequestStatuses,
    requestTypeText,
}