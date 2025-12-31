import { memo } from 'react';
import type { Message as MessageType } from '../types';
import { getUserConfig, formatTimestamp } from '../lib/utils';

interface MessageProps {
  message: MessageType;
}

export const Message = memo(({ message }: MessageProps) => {
  const config = getUserConfig(message.user_id);

  // System messages get special styling
  if (message.type === 'system' || message.username === 'System') {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-slate-700/30 text-slate-400 text-sm px-4 py-2 rounded-full">
          {message.content}
        </div>
      </div>
    );
  }

  // Own messages aligned to the right
  if (message.isOwn) {
    return (
      <div className="group hover:bg-slate-800/20 -mx-2 px-2 py-1 rounded transition-colors">
        <div className="flex gap-3 flex-row-reverse">
          <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center text-white font-semibold flex-shrink-0`}>
            {message.username[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0 text-right">
            <div className="flex items-baseline gap-2 mb-1 justify-end">
              <span className="text-xs text-slate-500">{formatTimestamp(message.timestamp)}</span>
              {message.user_id && (
                <span className="text-xs text-slate-500">
                  ID: {message.user_id}
                </span>
              )}
              <span className="font-semibold text-sky-400">
                {message.username}
              </span>
            </div>
            <p className="text-slate-200 break-words">{message.content}</p>
          </div>
        </div>
      </div>
    );
  }

  // Other users' messages aligned to the left
  return (
    <div className="group hover:bg-slate-800/20 -mx-2 px-2 py-1 rounded transition-colors">
      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center text-white font-semibold flex-shrink-0`}>
          {message.username[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <span className={`font-semibold ${config.color}`}>
              {message.username}
            </span>
            {message.user_id && (
              <span className="text-xs text-slate-500">
                ID: {message.user_id}
              </span>
            )}
            <span className="text-xs text-slate-500">{formatTimestamp(message.timestamp)}</span>
          </div>
          <p className="text-slate-200 break-words">{message.content}</p>
        </div>
      </div>
    </div>
  );
});

Message.displayName = 'Message';
