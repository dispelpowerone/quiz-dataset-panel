import {
  Box,
  TextField,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
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
        {image && <Box component='img' sx={style.image} src={`/public/images/${image}`} />}
        {!image && <ImageIcon sx={style.image} />}
      </>
    );
  };

  const renderText = (textName: string, content, disabled: boolean) => {
    return (
      <TextField
        label={textName}
        defaultValue={content}
        sx={style.text}
        variant="outlined"
        disabled={disabled}
        multiline
      />
    );
  };

  return (
    <Box sx={style.container}>
      {renderImage(question.image)}
      {renderText('TestId', question.test_id, true)}
      {renderText('QuestionId', question.question_id, true)}
      <Text name={'QuestionText'} text={question.text} />
      {question.answers.map((answer, index) =>
        <Text name={`Answer ${index + 1}`} text={answer.text} />
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
