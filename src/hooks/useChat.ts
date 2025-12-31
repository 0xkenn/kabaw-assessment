import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  connectRequested,
  disconnectRequested,
  channelChanged,
  messageSent,
} from '../store/chatSlice';
import { CHANNELS } from '../config/constants';
import type { Message } from '../types';


export const useChat = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.chat);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      dispatch(connectRequested());
    }

    return () => {
      if (import.meta.env.PROD) {
        dispatch(disconnectRequested());
      }
    };
  }, [dispatch]);

  const channelConfig = useMemo(
    () => CHANNELS.find((ch) => ch.id === state.currentChannel),
    [state.currentChannel]
  );

  const filteredMessages = useMemo(() => {
    return state.messages.filter((msg: Message) => {
      // For filtered channels (chatbot, developer, systemhelper)
      // Show only messages from that specific simulated user
      if (channelConfig?.userFilter) {
        return msg.user_id === channelConfig.userFilter;
      }

      // General channel shows all messages
      return true;
    });
  }, [state.messages, channelConfig]);

  const handleChangeChannel = useCallback(
    (channel: string) => dispatch(channelChanged(channel)),
    [dispatch]
  );

  const handleSendMessage = useCallback(
    (message: string) => dispatch(messageSent({ content: message, channel: state.currentChannel })),
    [dispatch, state.currentChannel]
  );

  const handleRetry = useCallback(
    () => dispatch(connectRequested()),
    [dispatch]
  );

  return {
    ...state,
    messages: filteredMessages,
    changeChannel: handleChangeChannel,
    sendMessage: handleSendMessage,
    retry: handleRetry,
  };
};