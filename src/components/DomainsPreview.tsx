import {
  memo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  Button,
  Container,
  List,
  ListItem,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { Domain } from '../libs/model';
import { fetchDomains } from '../libs/dao';


const DomainItem = memo(({
    domain,
    onClick
}: {
    domain: Domain;
    onClick: (domain: Domain) => void
}) => {
  return (
    <ListItem key={domain.name}>
      <Container disableGutters sx={style.domainContainer}>
        <h3 style={{ margin: 0 }}>{domain.description}</h3>
        <Container disableGutters sx={style.controlsContainer}>
          <Button
            sx={style.button}
            variant='contained'
            onClick={() => onClick(domain)}
          >
            TESTS &gt; &gt;
          </Button>
        </Container>
      </Container>
    </ListItem>
  );
});

export function DomainsPreview() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [domains, setDomains] = useState();

  useEffect(() => {
    fetchDomains().then(domains => {
      if (domains) {
        setDomains(domains);
        setIsLoading(false);
      }
    });
  }, []);

  const handleView = useCallback((domain: Domain) => {
    navigate(`${domain.name}/tests`);
  }, [navigate]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <List sx={{ width: '100%', maxWidth: 640, bgcolor: 'background.paper' }}>
      {domains.map(domain => (
        <DomainItem
          key={domain.name}
          domain={domain}
          onClick={handleView}
        />
      ))}
    </List>
  );
}

export default DomainsPreview;

const style = {
  domainContainer: {
    flex: 1,
    paddingTop: 10,
    borderRadius: 1,
    boxShadow: 2,
    padding: 3,
    marginBottom: 2,
  },
  controlsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginRight: 0,
  },
};
