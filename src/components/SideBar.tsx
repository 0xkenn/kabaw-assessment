import { Hash, RefreshCw } from 'lucide-react';
import { CHANNELS } from '../config/constants';
import { getUserConfig } from '../lib/utils';

interface SidebarProps {
  username: string;
  userId: string | null;
  isConnected: boolean;
  currentChannel: string;
  onChannelChange: (channel: string) => void;
  onRetry?: () => void;
}

export const Sidebar = ({
  username,
  userId,
  isConnected,
  currentChannel,
  onChannelChange,
  onRetry
}: SidebarProps) => {
  const userConfig = userId ? getUserConfig(userId) : getUserConfig('default');

  return (
    <div className="w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50 p-4 flex flex-col">
      <div className="mb-6">
        <h2 className="text-white text-xl font-bold mb-2">Kabaw Discord</h2>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-slate-400 text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
        
        {/* Retry button when disconnected */}
        {!isConnected && onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 px-3 py-2 rounded-lg text-sm font-medium transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Reconnect
          </button>
        )}
      </div>

      <div className="space-y-2 flex-1">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
          Text Channels
        </p>
        {CHANNELS.map((channel) => (
          <button
            key={channel.id}
            onClick={() => onChannelChange(channel.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
              currentChannel === channel.id
                ? 'text-white bg-slate-700/70'
                : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-300'
            }`}
          >
            <Hash size={20} />
            <div className="flex-1 text-left">
              <div className="font-medium">{channel.name}</div>
              <div className="text-xs opacity-70">{channel.description}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-auto bg-slate-900/50 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${userConfig.bgColor} flex items-center justify-center text-white font-semibold text-sm`}>
            {username[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">{username}</div>
            {userId && (
              <div className="text-slate-400 text-xs truncate" title={userId}>
                ID: {userId}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};