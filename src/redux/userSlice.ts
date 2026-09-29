import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    userId: string | null;
    userName: string | null;
    email: string | null;
    userApiInfo: string | null;
    // ponytail: 새 백엔드는 액세스 토큰을 httpOnly 쿠키로만 내려줘 JS에서 읽을 수 없다.
    // 캐릭터/챗봇 등 아직 v2 백엔드로 이전되지 않은 기능이 이 필드를 읽고 있어 타입만 유지, 항상 null.
    accessToken: string | null;
}
const initialUserInfoState: UserState = {
    userId: null,
    userName: null,
    email: null,
    userApiInfo: null,
    accessToken: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserInfoState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<{ userId: string; userName: string; email: string; userApiInfo?: string | null }>) => {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.userApiInfo = action.payload.userApiInfo ?? null;
        },
        clearUserData: (state) => {
            Object.assign(state, initialUserInfoState); // 모든 사용자 정보 초기화
        },
    },
});

export const { setUserInfo, clearUserData } = userSlice.actions;
export default userSlice.reducer;
