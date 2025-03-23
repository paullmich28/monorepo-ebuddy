import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './userSlice';
import authReducer from './authSlice'

const persistConfig = {
  key: "root", // Key for the storage
  storage, // Use localStorage
  whitelist: ["auth"], // List of reducers to persist (e.g., "auth")
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;