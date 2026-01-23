import {
  useState,
  useEffect,
} from 'react';
import {
  TextField,
  Button,
  Container,
  List,
  ListItem,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { PrebuildTest } from '../libs/model';
import { fetchTests } from '../libs/dao';
import { useDomain } from '../contexts/DomainContext';


export function TestsPreview() {
  const navigate = useNavigate();
  const { domainName } = useDomain();

  const [isLoading, setIsLoading] = useState(true);
  const [tests, setTests] = useState();

  useEffect(() => {
    fetchTests(domainName).then(tests => {
      if (tests) {
        setTests(tests);
        setIsLoading(false);
      }
      const scrollPosition = sessionStorage.getItem('testsPreviewScrollPosition');
      if (scrollPosition) {
        setTimeout(() => {
            window.scrollTo(0, parseInt(scrollPosition));
        }, 0);
        sessionStorage.removeItem('testsPreviewScrollPosition');
      }
    });
  }, [domainName]);

  if (isLoading) {
    return <CircularProgress />;
  }

  const handleView = (testId: number) => {
    sessionStorage.setItem('testsPreviewScrollPosition', window.pageYOffset);
    navigate('/QuestionsPreview', {
      state: {
        testId: testId,
      },
    });
  };

  const renderText = (textName: string, content) => {
    return (
      <ListItem key={'Position'}>
        <TextField
          label={textName}
          defaultValue={content}
          sx={style.text}
          disabled
          multiline
          variant='outlined'
          InputLabelProps={{
            style: {
              color: 'black',
              fontWeight: 1000,
            },
          }}
        />
      </ListItem>
    );
  };

  const renderTestItem = (test: PrebuildTest) => {
    return (
      <ListItem key={test.test_id}>
        <Container disableGutters sx={style.testContainer}>
          <h2>Test #{test.test_id}</h2>
          <List>
            {renderText('Position', String(test.position))}
          </List>
          <Container disableGutters sx={style.controlsContainer}>
            <Button
              sx={style.button}
              variant='contained'
              onClick={() => handleView(test.test_id)}
            >
              {'QUESTIONS > >'}
            </Button>
          </Container>
        </Container>
      </ListItem>
    );
  };

  return (
    <List sx={{ width: '100%', maxWidth: 640, bgcolor: 'background.paper' }}>
      {tests.map(test => renderTestItem(test))}
    </List>
  );
}

export default TestsPreview;

const style = {
  testContainer: {
    flex: 1,
    paddingTop: 10,
    borderRadius: 1,
    boxShadow: 2,
    padding: 3,
    marginBottom: 2,
  },
  text: {
    flex: 1,
    width: '100%',
    paddingBottom: 1,
    margin: 0,
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
