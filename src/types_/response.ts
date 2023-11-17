export type ResponseType = string|string[]|object|object[]

export enum ResponseStatus {
    success = "success",
    pending = "pending",
    error = "error"
}

type __obj = {arg: never;}

export default interface ApiResponse extends __obj {
    status: ResponseStatus
    data: ResponseType
}