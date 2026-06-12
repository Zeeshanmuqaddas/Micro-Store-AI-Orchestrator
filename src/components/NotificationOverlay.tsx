import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X, ShieldAlert, Zap } from 'lucide-react';

export interface AlertData {
  id: string;
  agentName: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
}

export function NotificationOverlay() {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  // Simulate real-time alerts popping up
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAlerts(prev => [
        ...prev,
        {
          id: 'alert-1',
          agentName: 'Customer Support Agent',
          message: 'Human intervention required: Complex refund dispute detected (Ticket #4092).',
          type: 'warning',
          timestamp: new Date()
        }
      ]);
    }, 4000);

    const timer2 = setTimeout(() => {
      setAlerts(prev => [
        ...prev,
        {
          id: 'alert-2',
          agentName: 'Competitor Intel Agent',
          message: 'API Rate Limit exceeded (Target: TechHaven). Model switching triggered.',
          type: 'error',
          timestamp: new Date()
        }
      ]);
    }, 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const dismiss = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
            className={`pointer-events-auto rounded-xl p-4 shadow-xl border relative w-full flex ${
              alert.type === 'error' ? 'bg-rose-50 border-rose-200' :
              alert.type === 'warning' ? 'bg-amber-50 border-amber-200' :
              'bg-blue-50 border-blue-200'
            }`}
          >
            <div className={`mr-3 mt-0.5 flex-shrink-0 ${
              alert.type === 'error' ? 'text-rose-600' :
              alert.type === 'warning' ? 'text-amber-600' :
              'text-blue-600'
            }`}>
              {alert.type === 'error' ? <ShieldAlert className="w-5 h-5" /> :
               alert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
               <Zap className="w-5 h-5" />}
            </div>
            <div className="flex-1 mr-6 mb-8">
              <h4 className={`text-sm font-semibold tracking-tight ${
                alert.type === 'error' ? 'text-rose-900' :
                alert.type === 'warning' ? 'text-amber-900' :
                'text-blue-900'
              }`}>
                {alert.agentName}
              </h4>
              <p className={`text-sm mt-1 leading-relaxed ${
                 alert.type === 'error' ? 'text-rose-700' :
                 alert.type === 'warning' ? 'text-amber-800' :
                 'text-blue-700'
              }`}>
                {alert.message}
              </p>
            </div>
            <button 
              onClick={() => dismiss(alert.id)}
              className={`absolute top-3 right-3 p-1.5 rounded-md transition-colors ${
                 alert.type === 'error' ? 'text-rose-400 hover:bg-rose-100 hover:text-rose-600' :
                 alert.type === 'warning' ? 'text-amber-400 hover:bg-amber-100 hover:text-amber-600' :
                 'text-blue-400 hover:bg-blue-100 hover:text-blue-600'
              }`}
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Action buttons */}
            <div className="absolute bottom-3 right-4 flex space-x-2">
              {alert.type === 'warning' && (
                <button onClick={() => dismiss(alert.id)} className="text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                  Review Ticket
                </button>
              )}
              {alert.type === 'error' && (
                <button onClick={() => dismiss(alert.id)} className="text-xs font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                  View Output Logs
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
