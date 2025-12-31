import type { UserConfig } from '../types';
import { USER_CONFIGS, DEFAULT_USER_CONFIG } from '../config/constants';

export const getUserConfig = (userId: string): UserConfig => {
  return USER_CONFIGS[userId] ?? DEFAULT_USER_CONFIG;
};

export const formatTimestamp = (timestamp: string): string => {
  try {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return timestamp;
  }
};

export const generateUsername = (): string => {
  return `User${Math.floor(Math.random() * 1000)}`;
};
