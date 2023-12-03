
export const serverPath = "http://localhost:6969"
export const basePath = serverPath+"/api"

export default {
    auth: {
        register: "/auth/register",
        login: "/auth/login",
        verify: "/auth/verify"
    },
    user: {
        profile: {
            create: "profile/create",
            delete: "profile/:id",
            update: "/profile/update",
            get: "/user/details/:id"
        }
    },
    skills: "/skills",
    skill: {
        create: "/skill/create"
    },
    work: {
        create: "/work/create"
    },
    post: {
        create: "/post/create",
        delete: "/post/:id",
        interact: "/post/:post/interact/:type", // type = like or comment
        interactions: "/post/:post/interactions/:type"
    },
    posts: {
        get: "/posts/:id",
        all: "/posts"
    }
}