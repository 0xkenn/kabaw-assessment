export interface Message {
  type: string;
  username: string;
  user_id: string;
  content: string;
  timestamp: string;
  channel: string;
  isOwn: boolean;
}

export type UserType = 'ChatBot' | 'Developer' | 'SystemHelper' | 'User';

export const USER_CONFIGS: Record<string, { color: string; bgColor: string; displayName: string }> = {
  '550e8400-e29b-41d4-a716-446655440001': { 
    color: 'text-green-400', 
    bgColor: 'bg-green-500',
    displayName: 'ChatBot'
  },
  '550e8400-e29b-41d4-a716-446655440002': { 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500',
    displayName: 'Developer'
  },
  '550e8400-e29b-41d4-a716-446655440003': { 
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-500',
    displayName: 'SystemHelper'
  },
};

export const CHANNELS = [
  { id: 'general', name: 'general', description: 'All users' },
  { id: 'chatbot', name: 'chatbot', description: 'ChatBot messages' },
  { id: 'developer', name: 'developer', description: 'Developer messages' },
  { id: 'systemhelper', name: 'systemhelper', description: 'SystemHelper messages' },
];