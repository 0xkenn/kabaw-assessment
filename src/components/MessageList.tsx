import { useEffect, useRef } from 'react';
import { Hash } from 'lucide-react';
import type { Message as MessageType } from '../types/index';
import { Message } from './Message';

interface MessageListProps {
  messages: MessageType[];
  channel: string;
}

export const MessageList = ({ messages, channel }: MessageListProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use instant scroll instead of smooth for better performance
    endRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages.length]); // Only trigger on message count change, not content

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-slate-500">
            <Hash size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-1">Welcome to #{channel}</p>
            <p className="text-sm">This is the start of your conversation</p>
          </div>
        </div>
      ) : (
        messages.map((msg) => (
          <Message
            key={`${msg.user_id}-${msg.timestamp}`}
            message={msg}
          />
        ))
      )}
      <div ref={endRef} />
    </div>
  );
};
