export interface Message {
  type: string;
  username: string;
  user_id: string;
  content: string;
  timestamp: string;
  channel: string;
  isOwn: boolean;
  uiChannel?: string; // UI channel where message was sent
}

export interface UserConfig {
  color: string;
  bgColor: string;
  displayName: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  userFilter?: string;
}

export interface ChatState {
  messages: Message[];
  isConnected: boolean;
  isReconnecting: boolean;
  username: string;
  userId: string | null;
  currentChannel: string;
}