import { createContext, useContext } from 'react';

export const DomainContext = createContext();
export const useDomain = () => useContext(DomainContext);
