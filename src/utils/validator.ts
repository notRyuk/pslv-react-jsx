import validator from "validator"

export default class Validator {
    static email = (email: string) => validator.isEmail(email)

    static phone = (phone: string) => phone.match(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)

    static username = (username: string) => username.match(/^[a-zA-A][a-zA-Z0-9._]{2,}[a-zA-Z]$/)
}