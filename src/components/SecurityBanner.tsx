import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Lock, AlertTriangle } from 'lucide-react';

export function SecurityBanner() {
  const [posture, setPosture] = useState<'secure' | 'elevated'>('secure');
  const [isContainmentActive, setIsContainmentActive] = useState(false);

  const handleContainment = () => {
    setIsContainmentActive(true);
    setPosture('secure');
    setTimeout(() => {
      setIsContainmentActive(false);
    }, 5000);
  };

  return (
    <div className={`w-full px-4 py-3 sm:px-6 lg:px-8 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between transition-colors ${posture === 'secure' ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
      <div className="flex items-center space-x-3 mb-3 sm:mb-0">
        {posture === 'secure' ? (
          <ShieldCheck className="h-6 w-6 text-emerald-600" />
        ) : (
          <ShieldAlert className="h-6 w-6 text-rose-600 animate-pulse" />
        )}
        <div>
          <h3 className={`text-sm font-bold ${posture === 'secure' ? 'text-emerald-900' : 'text-rose-900'}`}>
            {posture === 'secure' ? 'System Posture: Nominal' : 'Threat Detected: Elevated Risk'}
          </h3>
          <p className={`text-xs mt-0.5 ${posture === 'secure' ? 'text-emerald-700' : 'text-rose-700'}`}>
            <span className="font-semibold">Compliance:</span> SOC2 (Active) • NIST 800-53 (Verified)
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <button
          onClick={() => setPosture(posture === 'secure' ? 'elevated' : 'secure')}
          className={`text-xs font-medium px-3 py-1.5 rounded-md border transition-colors hidden sm:block ${posture === 'secure' ? 'text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'text-rose-700 border-rose-200 hover:bg-rose-100'}`}
        >
          Toggle Threat
        </button>
        <button
          onClick={handleContainment}
          disabled={isContainmentActive}
          className={`flex-1 sm:flex-none flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isContainmentActive 
              ? 'bg-gray-400 text-white cursor-not-allowed focus:ring-gray-400'
              : 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500'
          }`}
        >
          {isContainmentActive ? (
            <>
              <Lock className="w-4 h-4 mr-2 animate-bounce" />
              Executing Containment...
            </>
          ) : (
            <>
              <AlertTriangle className="w-4 h-4 mr-2" />
              Trigger Containment
            </>
          )}
        </button>
      </div>
    </div>
  );
}
