import IMongoDocument from "./mongo";

export default interface IAddress extends IMongoDocument {
    name?: string
    buildingName?: string // building name
    line1: string // flat no / house no
    line2?: string
    street: string
    landmark?: string
    city: string // city or village
    state: string
    pinCode: number
}