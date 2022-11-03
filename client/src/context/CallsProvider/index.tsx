import {
  createContext, ReactNode, useContext, useMemo,
} from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CallsI } from '../../types/calls.interface';

const CallsContext = createContext<CallsI>(null!);

const CallsProvider = ({ children }: { children: ReactNode }) => {
  const [callsData, setCallsData] = useLocalStorage('userProvider');

  const value: {callsData: object, setCallsData: object} = {
    callsData,
    setCallsData,
  };

  const memoValue = useMemo(() => value, [value]);

  // @ts-ignore
  return <CallsContext.Provider value={memoValue}>{children}</CallsContext.Provider>;
};

const useCalls = () => useContext(CallsContext);

export {
  CallsProvider,
  useCalls,
};
