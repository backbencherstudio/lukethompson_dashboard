import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  modalType: string | null;
  modalData: unknown;
}

const initialState: UIState = {
  isSidebarOpen: true,
  isModalOpen: false,
  modalType: null,
  modalData: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    openModal: (
      state,
      action: PayloadAction<{ type: string; data?: unknown }>,
    ) => {
      state.isModalOpen = true;
      state.modalType = action.payload.type;
      state.modalData = action.payload.data || null;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
      state.modalData = null;
    },
  },
});

export const { toggleSidebar, openModal, closeModal } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
