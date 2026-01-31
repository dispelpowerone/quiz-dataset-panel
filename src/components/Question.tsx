import {
  Fragment,
} from 'react';
import {
  Box,
  TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircle';
import { useParams, useLocation } from 'react-router-dom';
import TextExtended from './TextExtended';
import { PrebuildQuestion, PrebuildText } from '../libs/model';
import { getImageUrl } from '../libs/dao';


export function Question() {
  // Params
  const location = useLocation();
  const question: PrebuildQuestion = location.state.question;
  const mimicTexts: Record<number, PrebuildText> = location.state.mimicTexts;
  const { domainName } = useParams();

  const renderImage = (image?: string) => {
    return (
      <>
        {image &&
          <>
            <Box key='curImg' component='img' sx={style.image} src={getImageUrl(domainName, image)} />
            <Box key='origImg' component='img' sx={style.image} src={`/public/images-orig/${image}`} />
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
      <TextExtended
        name={'QuestionText'}
        text={question.text}
        mimicText={mimicTexts[question.text.text_id]}
      />
      {question.answers.map((answer, index) =>
        <Fragment key={`answer${index}`}>
          {answer.is_right_answer && (
            <CheckIcon color='success' fontSize='large' />
          )}
          <TextExtended
            name={`Answer ${index + 1}`}
            text={answer.text}
            mimicText={mimicTexts[answer.text.text_id]}
          />
        </Fragment>
      )}
      {question.comment_text && <TextExtended name={`Comment`} text={question.comment_text} />}
    </Box>
  );
}

export default Question;

const style = {
  container: {
    width: 'fit-content',
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
