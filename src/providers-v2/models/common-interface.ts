export interface BaseResponseResult {
    code?: string//The result code
    fields?: BaseResponseField[]//The details of request fields related to the result
    message?: string//The description for the result
}

export interface BaseResponseField {
    info?: string//Information of the field regarding the result ,
    name?: string//Name of a request field
}