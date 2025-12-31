import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Message, ChatState } from '../types';
import { CHANNELS } from '../config/constants';
import { generateUsername } from '../lib/utils';

const initialState: ChatState = {
  messages: [],
  isConnected: false,
  isReconnecting: false,
  username: generateUsername(),
  userId: null,
  currentChannel: CHANNELS[0].id,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    connected: (state, { payload }: PayloadAction<boolean>) => {
      state.isConnected = payload;
      if (payload) state.isReconnecting = false;
    },
    reconnecting: (state, { payload }: PayloadAction<boolean>) => {
      state.isReconnecting = payload;
    },
    userIdReceived: (state, { payload }: PayloadAction<string>) => {
      state.userId = payload;
    },
    messageReceived: (state, { payload }: PayloadAction<Message>) => {
      state.messages.push(payload);
    },
    channelChanged: (state, { payload }: PayloadAction<string>) => {
      state.currentChannel = payload;
    },
    messagesCleared: (state) => {
      state.messages = [];
    },
    messageSent: (_state, _action: PayloadAction<{ content: string; channel: string }>) => {
      // Handled by middleware
    },
    connectRequested: () => {
      // Handled by middleware
    },
    disconnectRequested: () => {
      // Handled by middleware
    },
  },
});

export const {
  connected,
  reconnecting,
  userIdReceived,
  messageReceived,
  channelChanged,
  messagesCleared,
  messageSent,
  connectRequested,
  disconnectRequested,
} = chatSlice.actions;

export default chatSlice.reducer;