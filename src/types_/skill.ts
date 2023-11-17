import IMongoDocument from "./mongo";

export default interface ISkill extends IMongoDocument {
    name: string
}