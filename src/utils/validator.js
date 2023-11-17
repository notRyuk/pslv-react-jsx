import validator from "validator"

export default class Validator {
    /**
     * 
     * @param {string} email 
     * @returns boolean
     */
    static email = (email) => validator.isEmail(email)

    /**
     * 
     * @param {string} email 
     * @returns boolean
     */
    static phone = (phone) => phone.match(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)

    /**
     * 
     * @param {string} email 
     * @returns boolean
     */
    static username = (username) => username.match(/^[a-zA-A][a-zA-Z0-9._]{2,}[a-zA-Z]$/)
}