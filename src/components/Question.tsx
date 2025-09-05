import {
  Box,
  TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircle';
import { useLocation } from 'react-router-dom';
import Text from './Text';
import { PrebuildQuestion } from '../libs/model';


export function Question() {
  // Params
  const location = useLocation();
  const question: PrebuildQuestion = location.state.question;

  const renderImage = (image?: string) => {
    return (
      <>
        {image &&
          <>
            <Box component='img' sx={style.image} src={`/public/images/${image}`} />
            <Box component='img' sx={style.image} src={`/public/images-orig/${image}`} />
          </>
        }
      </>
    );
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
  }

  return (
    <Box sx={style.container}>
      <h2>Question #{question.question_id}</h2>
      {renderImage(question.image)}
      {renderText('Image', question.image)}
      <Text name={'QuestionText'} text={question.text} />
      {question.answers.map((answer, index) =>
        <>
          {answer.is_right_answer && <CheckIcon color='success' fontSize='large' />}
          <Text name={`Answer ${index + 1}`} text={answer.text} />
        </>
      )}
      {question.comment_text && <Text name={`Comment`} text={question.comment_text} />}
    </Box>
  );
}

export default Question;

const style = {
  container: {
    width: '100%',
    bgcolor: 'background.paper',
    padding: 4,
    borderRadius: 1,
    boxShadow: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-begin',
  },
  image: {
    height: 150,
    width: 375,
    borderRadius: 1,
    boxShadow: 1,
    padding: 1,
    marginBottom: 2,
  },
  text: {
    flex: 1,
    width: 600,
    paddingBottom: 1,
    margin: 0,
  },
  rightAnswerIcon: {
    width: 100,
  },
};
