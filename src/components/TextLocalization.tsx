import {
  useState,
  useEffect,
} from 'react';
import {
  TextField,
  Container,
  List,
  ListItem,
  Collapse,
  Button,
} from '@mui/material';
import {
  PrebuildTextWarning,
  TextLocalization,
} from '../libs/model';
import type { Language } from '../libs/model';


export interface TextLocalizationViewProps {
  readonly lang: Language
  readonly localization: TextLocalization
  readonly warnings: [PrebuildTextWarning]
  readonly onUpdateWarning: (value: PrebuildTextWarning) => void
  readonly onChange: (value: string) => void
}

export function TextLocalizationView({
  lang,
  localization,
  warnings,
  onUpdateWarning,
  onChange,
}: TextLocalizationViewProps) {
  const [extendedMode, setExtendedMode] = useState(false);
  const [localWarnings, setLocalWarnings] = useState([]);
  const [activeWarningsCount, setActiveWarningsCount] = useState(0);

  useEffect(() => {
    const temp = warnings.filter(
      w => w.text_localization_id === localization.text_localization_id
    );
    setLocalWarnings(temp);
    setActiveWarningsCount(temp.filter(w => !w.is_manually_checked).length);
  }, [localization, warnings]);

  const handleSwitchWarnings = () => {
    setExtendedMode(!extendedMode)
  };

  const getShowWarningsButtonStyle = () => {
    if (localWarnings?.length < 1) {
      return [style.warningsButton, {visibility: 'hidden'}];
    }
    return style.warningsButton;
  };

  return (
    <Container sx={style.mainContainer} disableGutters maxWidth={false}>
      <TextField
        sx={style.text}
        label={lang}
        variant='outlined'
        defaultValue={localization.content}
        multiline
        InputProps={{
          style: activeWarningsCount ? style.warning : null,
        }}
        onChange={e => onChange(e.target.value)}
      />
      <Button
        sx={getShowWarningsButtonStyle()}
        variant={activeWarningsCount > 0 ? 'contained' : 'outlined'}
        onClick={handleSwitchWarnings}
      >
        {extendedMode ? '<<' : '>>'}
      </Button>
      <Collapse in={extendedMode} timeout='auto' unmountOnExit>
        <List sx={{padding: 0}}>
          {localWarnings.map((warning, index) => {
            return (
              <ListItem key={index}>
                <TextWarningView warning={warning} onUpdateWarning={onUpdateWarning} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </Container>
  );
}

export interface TextWarningViewProps {
  readonly warning: PrebuildTextWarning
  readonly onUpdateWarning: (value: PrebuildTextWarning) => void
}

export function TextWarningView({
  warning,
  onUpdateWarning,
}: TextWarningViewProps) {

  const handleProcessed = () => {
    onUpdateWarning({...warning, is_manually_checked: true});
  };

  return (
    <Container sx={style.warningContainer} disableGutters>
      <TextField
        sx={style.warningText}
        label={warning.code}
        variant='outlined'
        defaultValue={warning.content}
        multiline
        InputProps={{
          readOnly: true,
        }}
      />
      <Button
        sx={style.button}
        variant='contained'
        disabled={warning.is_manually_checked}
        onClick={handleProcessed}
      >
        {'OK'}
      </Button>
    </Container>
  );
}

export default TextLocalizationView;

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
  text: {
    width: 600,
    padding: 0,
    margin: 0,
  },
  warningsButton: {
    width: 20,
    height: 55,
  },
  warningContainer: {
    display: 'flex',
    width: 'fit-content',
    gap: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  warningText: {
    width: 600,
    padding: 0,
    margin: 0,
  },
  warning: {
    backgroundColor: '#ffd6c9',
  },
  button: {
    height: 60,
  },
};


