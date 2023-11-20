import ISession from "@types_/user/session.ts"

declare global {
    namespace Express {
        interface Request {
            user?: ISession
        }
    }
}