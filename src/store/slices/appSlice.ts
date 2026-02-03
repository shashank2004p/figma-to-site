import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  /** Global loading flag (e.g. for API calls) */
  isLoading: boolean;
  /** Global error message from API */
  error: string | null;
}

const initialState: AppState = {
  isLoading: false,
  error: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setError, clearError } = appSlice.actions;
export default appSlice.reducer;
