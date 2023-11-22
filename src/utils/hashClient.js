import { createHash, timingSafeEqual } from "node:crypto";

export default class Hash {
    static create = (input) => createHash("sha256").update(input).digest("base64")

    static compare = (hash, password) => timingSafeEqual(Buffer.from(hash), Buffer.from(this.create(password)))

    static simpleCompare = (val1, val2) => timingSafeEqual(Buffer.from(val1), Buffer.from(val2)) 
}