
"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthInitializer from "@/component/userAuth";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AuthInitializer />
            {children}
        </Provider>
    );
}