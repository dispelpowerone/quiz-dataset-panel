import { useState } from 'react';
import { DomainContext } from './DomainContext';

export function DomainProvider({ children }) {
  const [domainName, setDomainName] = useState(null);

  return (
    <DomainContext.Provider value={{ domainName, setDomainName }}>
      {children}
    </DomainContext.Provider>
  );
}

export default DomainProvider;
