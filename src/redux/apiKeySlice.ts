import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface apiKey {
    apiKey: string | null;
}

const initialApiKeyState: apiKey = {
    apiKey: null,
}

const apiKeySlice = createSlice({
    name: 'apiKey',
    initialState: initialApiKeyState,
    reducers: {
        setApiKey: (state, action: PayloadAction<string | null>) => {
            state.apiKey = action.payload;
        },
        clearApiKey: (state) => {
            state.apiKey = null;
        }
    }
})
export const { setApiKey, clearApiKey } = apiKeySlice.actions;
export default apiKeySlice.reducer;