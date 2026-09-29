
"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthInitializer from "@/component/userAuth";
import { AuthUser } from "@/utils/authApi";
import React from "react";

export function ReduxProvider({children, initialUser}: {
    children: React.ReactNode,
    initialUser: AuthUser | null,
}) {
    return (
        <Provider store={store}>
            <AuthInitializer initialUser={initialUser}/>
            {children}
        </Provider>
    );
}