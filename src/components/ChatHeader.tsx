import { Hash } from 'lucide-react';
import { CHANNELS } from '../config/constants';

interface ChatHeaderProps {
  channel: string;
}

export const ChatHeader = ({ channel }: ChatHeaderProps) => {
  const info = CHANNELS.find((c) => c.id === channel);

  return (
    <div className="h-16 bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 flex items-center px-6">
      <Hash size={24} className="text-slate-400 mr-2" />
      <div>
        <h1 className="text-white text-xl font-semibold">{info?.name || channel}</h1>
        <p className="text-slate-500 text-xs">{info?.description}</p>
      </div>
    </div>
  );
};
