import type { Middleware } from '@reduxjs/toolkit';
import type { Message } from '../types/index';
import {
  connected,
  reconnecting,
  userIdReceived,
  messageReceived,
  messageSent,
  connectRequested,
  disconnectRequested,
} from '../store/chatSlice';
import { WEBSOCKET, USER_IDS } from '../config/constants';

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let shouldReconnect = true;
let attempts = 0;

const cleanup = () => {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
};

const closeSocket = (code = 1000) => {
  shouldReconnect = false;
  cleanup();
  if (socket) {
    socket.close(code);
    socket = null;
  }
};
export const websocketMiddleware: Middleware = (store) => (next) => (action) => {
  const { username } = store.getState().chat;

  if (connectRequested.match(action)) {
    closeSocket();

    const wasReconnecting = store.getState().chat.isReconnecting;

    if (!wasReconnecting) {
      attempts = 0;
    }

    shouldReconnect = true;

    // Only set reconnecting state if we were already trying to reconnect
    if (wasReconnecting) {
      store.dispatch(reconnecting(true));
    }

    socket = new WebSocket(`${WEBSOCKET.URL}?username=${username}&channel=general`);

    socket.onopen = () => {
      attempts = 0;
      store.dispatch(connected(true));
      store.dispatch(reconnecting(false));
    };

    socket.onmessage = ({ data }) => {
      try {
        const parsed = JSON.parse(data);

        // Handle user_connected event
        if (parsed.type === 'user_connected') {
          // Store the user_id from the server's welcome message
          if (parsed.user_id) {
            store.dispatch(userIdReceived(parsed.user_id));
          }
          return;
        }

        // Handle user_disconnected event (bonus feature)
        if (parsed.type === 'user_disconnected') {
          const systemMessage: Message = {
            type: 'system',
            username: 'System',
            user_id: USER_IDS.SYSTEMHELPER,
            content: `${parsed.username} left the chat`,
            timestamp: parsed.timestamp || new Date().toISOString(),
            channel: parsed.channel || 'general',
            isOwn: false,
          };
          store.dispatch(messageReceived(systemMessage));
          return;
        }

        // Handle regular messages
        if (parsed.type === 'message') {
          const message: Message = {
            ...parsed,
            isOwn: parsed.username === username,
            // Preserve uiChannel if it exists (for user's own messages)
            uiChannel: parsed.uiChannel,
          };
          store.dispatch(messageReceived(message));
        }
      } catch {
        const message: Message = {
          type: 'message',
          username: 'System',
          user_id: USER_IDS.SYSTEMHELPER,
          content: data,
          timestamp: new Date().toISOString(),
          channel: 'general',
          isOwn: false,
        };
        store.dispatch(messageReceived(message));
      }
    };

    socket.onclose = ({ code }) => {
      store.dispatch(connected(false));

      if (shouldReconnect && code !== 1000 && attempts < WEBSOCKET.MAX_ATTEMPTS) {
        attempts++;
        store.dispatch(reconnecting(true));
        reconnectTimer = setTimeout(() => {
          store.dispatch(connectRequested());
        }, WEBSOCKET.RECONNECT_DELAY);
      } else {
        shouldReconnect = false;
        store.dispatch(reconnecting(false));
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  if (disconnectRequested.match(action)) {
    attempts = 0;
    closeSocket();
    store.dispatch(connected(false));
    store.dispatch(reconnecting(false));
  }

  if (messageSent.match(action) && socket?.readyState === WebSocket.OPEN) {
    const payload = action.payload as { content: string; channel: string };
    const content = payload.content?.trim();
    if (content) {
      const message = {
        type: 'message',
        content: content,
        uiChannel: payload.channel, // Tag with UI channel for filtering
      };
      socket.send(JSON.stringify(message));
    }
  }

  return next(action);
};
