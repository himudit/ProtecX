import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ToastType = 'success' | 'error' | 'loading';

interface ToastState {
    isOpen: boolean;
    message: string;
    type: ToastType;
}

const initialState: ToastState = {
    isOpen: false,
    message: '',
    type: 'loading',
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (
            state,
            action: PayloadAction<{ message: string; type: ToastType }>
        ) => {
            state.isOpen = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hideToast: (state) => {
            state.isOpen = false;
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
