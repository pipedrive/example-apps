import { createContext, useContext, useState } from 'react';
import logger from './logger';

const AppContext = createContext();
const log = logger('App Context');

export const AppContextWrapper = ({ children }) => {
  const [user, setUser] = useState({});
  // Possible States -> Listening, Ringing, Connected, Disconnected
  const [callerState, setCallerState] = useState('listening');
  const [missedCall, setMissedCall] = useState(0);
  const [callerDetails, setCallerDetails] = useState({});

  const sharedState = {
    user,
    setUser,
    callerState,
    setCallerState,
    callerDetails,
    setCallerDetails,
    missedCall,
    setMissedCall,
  };

  log.info('Context created');
  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
