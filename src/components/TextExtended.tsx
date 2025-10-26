import {
  useState,
  useEffect,
} from 'react';
import {
  Container,
  Collapse,
  Button,
} from '@mui/material';
import { PrebuildText } from '../libs/model';
import { useTextState } from '../libs/text';
import Text from './Text';
import TextMimic from './TextMimic';


export interface TextExtendedProps {
  readonly name: string
  readonly text: PrebuildText
  readonly mimicText?: PrebuildText
}

export function TextExtended({
  name,
  text,
  mimicText,
}: TextExtendedProps) {

  const textState = useTextState(text);
  const [extendedMode, setExtendedMode] = useState(false);
  const [hasMismatch, setHasMismatch] = useState(false);

  useEffect(() => {
    setHasMismatch(false);
  }, [text, mimicText]);

  const getShowMimicButtonStyle = () => {
    if (!mimicText) {
      return [style.mimicButton, {visibility: 'hidden'}];
    }
    return style.mimicButton;
  };

  const handleSwitchMimic = () => {
    setExtendedMode(!extendedMode)
  };

  return (
    <Container sx={style.mainContainer} disableGutters maxWidth={false}>
      <Text
        name={name}
        textState={textState}
        extendedMode={extendedMode}
        setExtendedMode={setExtendedMode}
      />
      {mimicText && (<>
        <Button
          sx={getShowMimicButtonStyle()}
          variant={hasMismatch > 0 ? 'contained' : 'outlined'}
          onClick={handleSwitchMimic}
        >
        {extendedMode ? '<<' : '>>'}
        </Button>
        <Collapse in={extendedMode} timeout='auto' unmountOnExit>
          <TextMimic
            name={name}
            text={mimicText}
            targetState={textState}
          />
        </Collapse>
      </>)}
    </Container>
  );
}

export default TextExtended;

const style = {
  mainContainer: {
    display: 'flex',
    width: 'fit-content',
    gap: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 0,
    margin: 0,
  },
  mimicButton: {
    width: 20,
    height: 55,
  },
}
