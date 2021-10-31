import {
  createSlice,
  SerializedError,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import request from "../../config/requests";

export enum AuthStates {
  IDLE = "idle",
  LOADING = "loading",
}

export interface AuthSliceState {
  accessToken: string;
  loading: AuthStates;
  me?: {
    name?: string;
    email?: string;
    id?: number;
    role?: string;
  };
  error?: SerializedError;
}

// That's what we will store in the auth slice.
const internalInitialState: AuthSliceState = {
  accessToken: "",
  loading: AuthStates.IDLE,
  me: undefined,
  error: {},
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      await request.post("api/register", credentials);
      const response = await axios.post("api/login", credentials);
      const user = await axios.get("api/user");

      return {
        me: user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("api/login", credentials);
      const user = await axios.get("api/user");
      return {
        me: user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const authSlice = createSlice({
  name: "auth", // name of the slice that we will use.
  initialState: internalInitialState,
  reducers: {
    // here will end up non async basic reducers.
    updateAccessToken(
      state: AuthSliceState,
      action: PayloadAction<{ token: string }>
    ) {
      state.accessToken = action.payload.token;
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: any) => {
      state.accessToken = action.payload.accessToken;
      state.me = action.payload.me;
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(login.rejected, (state, action) => {
      state = {
        ...internalInitialState,
        error: action.error,
      };
      throw new Error(action.error.message);
    });
    builder.addCase(register.fulfilled, (state, action: any) => {
      state.accessToken = action.payload.accessToken;
      state.me = action.payload.me;
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(register.pending, (state, action) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const { updateAccessToken, reset } = authSlice.actions;