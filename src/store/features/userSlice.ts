import { fetchTokens, fetchUser } from "@/api/user";
import { signinFormType, tokensType, userType } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
    "user/getUser",
    async ({ email, password }: signinFormType) => {
        const user = await fetchUser({ email, password })
        return user
    }
)

export const getTokens = createAsyncThunk(
    "user/getTokens",
    async ({ email, password }: signinFormType) => {
        const tokens = await fetchTokens({ email, password })
        return tokens
    }
)

type userStateType = {
    user: null | userType,
    tokens: {
        access: string | null,
        refresh: string | null
    }
}

const initialState: userStateType = {
    user: null,
    tokens: {
        access: null,
        refresh: null
    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.tokens.access = null;
            state.tokens.refresh = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(getUser.fulfilled, (state, action: PayloadAction<userType>) => {
            state.user = action.payload
        }).addCase(getTokens.fulfilled, (state, action: PayloadAction<tokensType>) => {
            state.tokens.access = action.payload.access;
            state.tokens.refresh = action.payload.refresh;
        })
    },
});

export const {logout} = userSlice.actions;
export const userReducer = userSlice.reducer;