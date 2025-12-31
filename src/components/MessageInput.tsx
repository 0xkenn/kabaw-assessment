import { useState } from 'react';
import { Send, Wifi, WifiOff, Eye } from 'lucide-react';

interface MessageInputProps {
  isConnected: boolean;
  onSendMessage: (message: string) => void;
  channel: string;
}

export const MessageInput = ({ isConnected, onSendMessage, channel }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const isGeneralChannel = channel === 'general';
  const canSendMessage = isConnected && isGeneralChannel;

  const handleSend = () => {
    if (message.trim() && canSendMessage) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getPlaceholder = () => {
    if (!isConnected) return 'Viewing offline - reconnect to send messages';
    if (!isGeneralChannel) return 'Read-only channel - Switch to #general to send messages';
    return `Message #${channel}`;
  };

  return (
    <div className="p-6 bg-slate-800/30 backdrop-blur-sm border-t border-slate-700/50">
      <div className="flex gap-3 items-end">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={!canSendMessage}
          placeholder={getPlaceholder()}
          className="flex-1 bg-slate-700/50 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || !canSendMessage}
          className="bg-sky-600 hover:bg-sky-700 text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <Send size={20} />
        </button>
      </div>
      
      <div className="flex items-center gap-2 mt-3 text-xs">
        {!isConnected ? (
          <>
            <WifiOff size={14} className="text-red-400 animate-pulse" />
            <span className="text-red-400">Offline mode - Messages are read-only. Reconnect to send messages.</span>
          </>
        ) : !isGeneralChannel ? (
          <>
            <Eye size={14} className="text-amber-400" />
            <span className="text-amber-400">Read-only channel - Switch to #general to send messages</span>
          </>
        ) : (
          <>
            <Wifi size={14} className="text-emerald-400" />
            <span className="text-emerald-400">Connected</span>
          </>
        )}
      </div>
    </div>
  );
};