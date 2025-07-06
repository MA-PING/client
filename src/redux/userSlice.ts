import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    userId: string | null;
    userName: string | null;
    email: string | null;
    userApiInfo: string | null;
    accessToken: string | null;
    tokenExpiresAt: number | null;
}
const initialUserInfoState: UserState = {
    userId: null,
    userName: null,
    email: null,
    userApiInfo: null,
    accessToken: null,
    tokenExpiresAt: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserInfoState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<{ userId: string; userName: string; email: string; userApiInfo: string }>) => {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.userApiInfo = action.payload.userApiInfo;
        },
        setAccessToken: (state, action: PayloadAction<{ accessToken: string; tokenExpiresAt: number }>) => {
            state.accessToken = action.payload.accessToken;
            state.tokenExpiresAt = action.payload.tokenExpiresAt;
        },
        clearUserData: (state) => {
            Object.assign(state, initialUserInfoState); // 모든 사용자 정보 초기화
        },
    },
});

export const { setUserInfo, setAccessToken, clearUserData } = userSlice.actions;
export default userSlice.reducer;