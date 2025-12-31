import type { UserConfig } from '../types';


interface Channel {
  id: string;
  name: string;
  description: string;
  userFilter?: string; // optional
}

export const USER_IDS = {
  CHATBOT: '550e8400-e29b-41d4-a716-446655440001',
  DEVELOPER: '550e8400-e29b-41d4-a716-446655440002',
  SYSTEMHELPER: '550e8400-e29b-41d4-a716-446655440003',
} as const;

export type SystemUserId = typeof USER_IDS[keyof typeof USER_IDS];

export const USER_CONFIGS: Record<string, UserConfig> = {
  [USER_IDS.CHATBOT]: {
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500',
    displayName: 'ChatBot',
  },
  [USER_IDS.DEVELOPER]: {
    color: 'text-sky-400',
    bgColor: 'bg-sky-600',
    displayName: 'Developer',
  },
  [USER_IDS.SYSTEMHELPER]: {
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500',
    displayName: 'SystemHelper',
  },
};

export const DEFAULT_USER_CONFIG: UserConfig = {
  color: 'text-gray-400',
  bgColor: 'bg-gray-500',
  displayName: 'User',
};

export const CHANNELS: Channel[] = [
  { id: 'general', name: 'general', description: 'All users' },
  { id: 'chatbot', name: 'chatbot', description: 'ChatBot messages', userFilter: USER_IDS.CHATBOT },
  { id: 'developer', name: 'developer', description: 'Developer messages', userFilter: USER_IDS.DEVELOPER },
  { id: 'systemhelper', name: 'systemhelper', description: 'SystemHelper messages', userFilter: USER_IDS.SYSTEMHELPER },
] as const;

export const WEBSOCKET = {
  URL: 'ws://localhost:8080/ws',
  RECONNECT_DELAY: 3000,
  MAX_ATTEMPTS: 3,
} as const;