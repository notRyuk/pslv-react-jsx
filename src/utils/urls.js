
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
            create: "/profile/create",
            delete: "/profile/:id",
            update: "/profile/update",
            get: "/user/details/:id",
            addSkill: "/profile/add-skill"
        },
        address:{
            create: "/address/create"
        },
        suggestedUser:{
            get: "/user/all-users"
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
    },
    request: {
        create: "/connection-request/create",
        acceptMutual: "/connection-request/:request/mutual/accept",
        from: "/connection-request/from",
        ignore:"/connection-request/:request/ignore",
        alumni: "/admin/connection-request/:request/:status",
        alumniRequests: "/connection-request/alumniRequests",
        findByType: "/connection-request/:type"
    },
    connections: {
        getByUser: "/connections/:user"
    },
    company: {
        create: "/company/create",
        findAll: "/companies"
    },
    job: {
        create: "/job/create",
        findAll: "/jobs",
        application: {
            create: "/job-application/create",
            findByJob: "/job-applications/job/:job"
        }
    },
    news: {
        create: "/news/create",
        update: "/news/:id",
        delete: "/news/:id",
        find: "/news"
    },
    achievement: {
        create: "/achievement/create",
        findAll: "/achievements",
        findById: "/achievements/:id",
    },
    institute: {
        create: "/institute/create",
        delete: "/institute/:id",
        findAll: "/institutes",
        findById: "/institutes/:id"
    },
    education: {
        create: "/education/create"
    }
}