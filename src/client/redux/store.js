import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@client/components/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
