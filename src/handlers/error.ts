import ResponseHandler from ".";

export class ErrorHandler<T> extends ResponseHandler {
    model: T|null
    modelName: string
    constructor(modelName: string) {
        super()
        this.modelName = modelName
        this.model = null 
    }

    static fieldRequired = (field: string, model: string): [boolean, string] => [
        true, 
        `The ${field} of the ${model} is required.`
    ]

    static mongooseInvalid = (
        field: string, 
        model: string, 
        arg?: string
    ): [boolean, string] => [
        true,
        `The ${field} of the ${model} is invalid.`+arg
    ]

    fieldRequired = (field: string): [boolean, string] => [
        true, 
        `The ${field} of the ${this.modelName} is required.`
    ]

    mongooseInvalid = (
        field: string,
        arg?: string
    ): [boolean, string] => [
        true,
        `The ${field} of the ${this.modelName} is invalid. `+arg
    ]

    fieldInvalid = (
        field: string, 
        arg?: string
    ) => `The ${field} of the ${this.modelName} is invalid. `+arg
}