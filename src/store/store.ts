import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import chatReducer from './chatSlice';
import { websocketMiddleware } from '../middleware/websocket';

const persistConfig = {
  key: 'chat',
  storage,
  whitelist: ['username'],
  blacklist: ['isConnected', 'isReconnecting', 'userId', 'messages'],
};

export const store = configureStore({
  reducer: {
    chat: persistReducer(persistConfig, chatReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(websocketMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;