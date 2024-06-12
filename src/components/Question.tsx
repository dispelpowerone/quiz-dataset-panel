import {
  Box,
  TextField,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import CheckIcon from '@mui/icons-material/Check';
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
          {answer.is_right_answer && <CheckIcon />}
          <Text name={`Answer ${index + 1}`} text={answer.text} />
        </>
      )}
    </Box>
  );
}

export default Question;

const style = {
  container: {
    width: '100%',
    maxWidth: 640,
    bgcolor: 'background.paper',
    padding: 4,
    margin: 2,
    borderRadius: 1,
    boxShadow: 2,
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
    width: '100%',
    paddingBottom: 1,
    margin: 0,
  },
};
