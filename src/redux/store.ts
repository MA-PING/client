import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import apiKeyReducer from "./apiKeySlice";

export const store = configureStore({
    reducer: {
        userInfo: userReducer,
        apiKey: apiKeyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;