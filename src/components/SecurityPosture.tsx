import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Lock, AlertTriangle, Fingerprint, Activity } from 'lucide-react';

export function SecurityPosture() {
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
    <div className={`w-full px-4 py-2 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between transition-all duration-300 ${posture === 'secure' ? 'bg-gray-900 border-b border-indigo-500/30' : 'bg-rose-950 border-b border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]'}`}>
      <div className="flex items-center space-x-4 mb-3 sm:mb-0">
        <div className={`p-2 rounded-full ${posture === 'secure' ? 'bg-emerald-500/20' : 'bg-rose-500/30 animate-pulse'}`}>
          {posture === 'secure' ? (
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-rose-500" />
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-3">
            <h3 className={`text-sm font-bold uppercase tracking-widest ${posture === 'secure' ? 'text-gray-100' : 'text-rose-100'}`}>
              {posture === 'secure' ? 'Security Posture: Nominal' : 'Security Posture: Threat Detected'}
            </h3>
            {posture === 'elevated' && (
               <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded animate-pulse">ACTION REQUIRED</span>
            )}
          </div>
          <p className="text-xs mt-0.5 text-gray-400 font-medium flex items-center space-x-2">
            <span className="flex items-center"><Fingerprint className="w-3 h-3 mr-1 text-indigo-400" /> SOC2: ACTIVE</span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center"><Activity className="w-3 h-3 mr-1 text-emerald-400" /> NIST 800-53: VERIFIED</span>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <button
          onClick={() => setPosture(posture === 'secure' ? 'elevated' : 'secure')}
          className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border transition-colors hidden sm:block ${posture === 'secure' ? 'text-gray-400 border-gray-700 hover:bg-gray-800' : 'text-rose-300 border-rose-800 hover:bg-rose-900'}`}
        >
          Simulate Threat
        </button>
        <button
          onClick={handleContainment}
          disabled={isContainmentActive}
          className={`flex-1 sm:flex-none flex items-center justify-center px-4 py-1.5 rounded text-xs font-bold shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 uppercase tracking-wide ${
            isContainmentActive 
              ? 'bg-gray-700 text-gray-300 cursor-not-allowed focus:ring-gray-700'
              : 'bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.4)]'
          }`}
        >
          {isContainmentActive ? (
            <>
              <Lock className="w-4 h-4 mr-2 animate-bounce" />
              Containment Engaged
            </>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4 mr-2" />
              Emergency Containment
            </>
          )}
        </button>
      </div>
    </div>
  );
}
