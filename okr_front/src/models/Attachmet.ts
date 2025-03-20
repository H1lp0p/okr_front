class Attachment{
    fileName?: string
    file?: File
    date?: Date
    id?: string

    constructor(fileName?: string, date?: Date, file?: File, id: string = "-1"){
        this.file = file
        this.fileName = fileName
        this.date = date
    }
}

export default Attachment