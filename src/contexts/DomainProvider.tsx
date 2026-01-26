import { useParams } from 'react-router-dom';
import { DomainContext } from './DomainContext';

export function DomainProvider({ children }) {
  const { domainName } = useParams();

  return (
    <DomainContext.Provider value={{ domainName }}>
      {children}
    </DomainContext.Provider>
  );
}

export default DomainProvider;
