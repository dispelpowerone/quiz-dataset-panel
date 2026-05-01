import {
  Fragment,
} from 'react';
import {
  Box,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircle';
import { useParams, useLocation } from 'react-router-dom';
import TextExtended from './TextExtended';
import QuestionImage from './QuestionImage';
import { PrebuildQuestion, PrebuildText } from '../libs/model';


export function Question() {
  // Params
  const location = useLocation();
  const question: PrebuildQuestion = location.state.question;
  const mimicTexts: Record<number, PrebuildText> = location.state.mimicTexts;
  const { domainName } = useParams();

  return (
    <Box sx={style.container}>
      <h2>Question #{question.question_id}</h2>
      <QuestionImage domainName={domainName} image={question.image} />
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
  rightAnswerIcon: {
    width: 100,
  },
};
