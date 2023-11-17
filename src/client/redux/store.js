import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@client/components/auth/authSlice";
import userReducer from "../components/auth/user/userSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
});
