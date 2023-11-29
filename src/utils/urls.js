export const basePath = "https://localhost:6969"

export default {
    auth: {
        register: "/auth/register",
        login: "/auth/login",
        verify: "/auth/verify"
    },
    user: {
        profile: {
            create: "/user/profile/create",
            delete: "/user/profile/delete",
            update: "/user/profile/update",
            get: "/user/profile"
        }
    }
}