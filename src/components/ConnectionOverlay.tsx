import { Loader2, WifiOff, RefreshCw, X } from 'lucide-react';

interface ConnectionOverlayProps {
  isReconnecting: boolean;
  isConnected: boolean;
  onRetry: () => void;
  onDismiss: () => void;
}

export const ConnectionOverlay = ({ 
  isReconnecting, 
  isConnected, 
  onRetry, 
  onDismiss 
}: ConnectionOverlayProps) => {
  if (isConnected) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-8 max-w-md mx-4 shadow-2xl relative">
        {/* Close button - only show when not reconnecting */}
        {!isReconnecting && (
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            aria-label="Close and view messages"
          >
            <X size={20} />
          </button>
        )}

        {isReconnecting ? (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <WifiOff className="w-16 h-16 text-slate-400" />
              <Loader2 className="w-16 h-16 text-sky-400 absolute inset-0 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Reconnecting...</h2>
            <p className="text-slate-400">Lost connection to server</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <WifiOff className="w-16 h-16 text-red-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Connection Failed</h2>
            <p className="text-slate-400 mb-2">Unable to connect to server</p>
            <p className="text-sm text-slate-500 mb-6">Check if Go server is running on port 8080</p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={onRetry}
                className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium transition-all active:scale-95"
              >
                <RefreshCw className="w-5 h-5" />
                Retry Connection
              </button>
              <button
                onClick={onDismiss}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                View messages offline
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};