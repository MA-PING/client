
"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthInitializer from "@/component/userAuth";
import React from "react";

export function ReduxProvider({children, accessToken}: {
    children: React.ReactNode,
    accessToken?: string | undefined,
}) {
    return (
        <Provider store={store}>
            <AuthInitializer accessToken={accessToken}/>
            {children}
        </Provider>
    );
}