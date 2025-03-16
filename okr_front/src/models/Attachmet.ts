class Attachment{
    fileName?: string
    file?: File
    date?: Date

    constructor(fileName?: string, date?: Date, file?: File){
        this.file = file
        this.fileName = fileName
        this.date = date
    }
}

export default Attachment