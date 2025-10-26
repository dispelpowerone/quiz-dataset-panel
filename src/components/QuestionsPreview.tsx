import {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  TextField,
  Button,
  Container,
  List,
  ListItem,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { PrebuildQuestion } from '../libs/model';
import {
  fetchQuestions,
  searchMimicTexts,
} from '../libs/dao';
import {
  filterQuestionMimics,
} from '../libs/text_mimic';


export function QuestionsPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const testId = location.state.testId;

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState();
  const [mimicTexts, setMimicTexts] = useState();

  useEffect(() => {
    async function fetchData() {
      setQuestions(await fetchQuestions(testId));
      setMimicTexts(await searchMimicTexts(testId))
      // Restore scroll position
      const scrollPosition = sessionStorage.getItem('questionsPreviewScrollPosition');
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(scrollPosition));
        }, 0);
        sessionStorage.removeItem('questionsPreviewScrollPosition');
      }
      setIsLoading(false);
    }
    fetchData();
  }, [testId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  const handleView = (question: PrebuildQuestion) => {
    sessionStorage.setItem('questionsPreviewScrollPosition', window.pageYOffset);
    navigate('/Question', {
      state: {
        question: question,
        mimicTexts: filterQuestionMimics(mimicTexts, question)
      },
    });
  };

  const countTextWarnings = (text: PrebuildTest) => {
    return text.warnings.filter(w => !w.is_manually_checked).length
  };

  const countQuestionWarnings = (question: PrebuildQuestion) => {
    let count = countTextWarnings(question.text);
    question.answers.forEach(answer => {
      count += countTextWarnings(answer.text);
    });
    return count;
  };

  const renderText = (textName: string, content) => {
    return (
      <TextField
        label={textName}
        defaultValue={content}
        sx={style.text}
        variant='outlined'
        disabled
        multiline
        InputLabelProps={{
          style: {
            color: 'black',
            fontWeight: 1000,
          },
        }}
      />
    );
  };

  const renderQuestionItem = (question: PrebuildQuestion) => {
    return (
      <ListItem key={question.question_id}>
        <Container disableGutters sx={style.questionContainer}>
          <h2>Question #{question.question_id}</h2>
          {question.image &&
            <>
              <Box
                component='img'
                sx={style.image}
                src={`/public/images/${question.image}`}
              />
              <Box
                component='img'
                sx={style.image}
                src={`/public/images-orig/${question.image}`}
              />
            </>
          }
          {renderText('TestId', question.test_id)}
          <TextField
            label={'Text'}
            defaultValue={question.text.localizations.EN.content}
            sx={style.text}
            variant='outlined'
            disabled
            multiline
            InputProps={{
              style: countQuestionWarnings(question) ? style.warning : null,
            }}
            InputLabelProps={{
              style: {
                color: 'black',
                fontWeight: 1000,
              },
            }}
          />
          <Container disableGutters sx={style.controlsContainer}>
            <Button
              sx={style.button}
              variant='contained'
              onClick={() => handleView(question)}
            >
              {'MORE > >'}
            </Button>
          </Container>
        </Container>
      </ListItem>
    );
  };

  return (
    <List sx={{ width: '100%', maxWidth: 640, bgcolor: 'background.paper' }}>
      {questions.map(question => renderQuestionItem(question))}
    </List>
  );
}

export default QuestionsPreview;

const style = {
  questionContainer: {
    flex: 1,
    paddingTop: 10,
    borderRadius: 1,
    boxShadow: 2,
    padding: 3,
    marginBottom: 2,
  },
  image: {
    height: 150,
    width: 375,
    padding: 1,
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
  warning: {
    backgroundColor: '#ffd6c9',
  },
};
