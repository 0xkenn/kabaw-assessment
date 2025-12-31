import { useState } from 'react';
import { useChat } from './hooks/useChat';
import { ConnectionOverlay } from './components/ConnectionOverlay';
import { Sidebar } from './components/SideBar';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';

export default function App() {
  const {
    username,
    userId,
    isConnected,
    isReconnecting,
    currentChannel,
    messages,
    changeChannel,
    sendMessage,
    retry,
  } = useChat();

  const [overlayDismissed, setOverlayDismissed] = useState(false);

  const handleDismiss = () => {
    setOverlayDismissed(true);
  };

  const handleRetry = () => {
    setOverlayDismissed(false);
    retry();
  };

  // Only show overlay if disconnected AND we have a userId (meaning we connected before)
  const showOverlay = (!isConnected || isReconnecting) && !overlayDismissed && userId !== null;

  return (
    <>
      {showOverlay && (
        <ConnectionOverlay
          isReconnecting={isReconnecting}
          isConnected={isConnected}
          onRetry={handleRetry}
          onDismiss={handleDismiss}
        />
      )}
      
      <div className="flex h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950">
        <Sidebar
          username={username}
          userId={userId}
          isConnected={isConnected}
          currentChannel={currentChannel}
          onChannelChange={changeChannel}
          onRetry={handleRetry}
        />

        <div className="flex flex-col flex-1">
          <ChatHeader channel={currentChannel} />
          <MessageList messages={messages} channel={currentChannel} />
          <MessageInput
            isConnected={isConnected}
            onSendMessage={sendMessage}
            channel={currentChannel}
          />
        </div>
      </div>
    </>
  );
}