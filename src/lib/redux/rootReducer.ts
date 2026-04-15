import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./slices/authSlice";
import { uiReducer } from "./slices/uiSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
