import { useState } from 'react';
import { DomainContext } from './DomainContext';

export function DomainProvider({ children }) {
  const [selectedDomain, setSelectedDomain] = useState(null);

  return (
    <DomainContext.Provider value={{ selectedDomain, setSelectedDomain }}>
      {children}
    </DomainContext.Provider>
  );
}

export default DomainProvider;
