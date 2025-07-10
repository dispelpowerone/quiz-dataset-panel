import {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Box,
  TextField,
  Button,
  Container,
  List,
  ListItem,
  ListSubheader,
  Collapse,
  Checkbox,
  InputAdornment,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextLocalizationView from './TextLocalization';
import cloneDeep from 'lodash/cloneDeep';
import { PrebuildText } from '../libs/model';
import { updateText } from '../libs/dao';


export interface TextProps {
  readonly name: string
  readonly text: PrebuildText
}

export function Text({
  name,
  text,
}: TextProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [textActual, setTextActual] = useState(text);
  const [textWarnings, setTextWarnings] = useState([]);
  const [activeWarningsCount, setActiveWarningsCount] = useState(0);
  const textMutableRef = useRef(text);

  useEffect(() => {
    setTextWarnings(textActual.warnings);
  }, [editMode, textActual]);

  useEffect(() => {
    setActiveWarningsCount(textWarnings.filter(w => !w.is_manually_checked).length);
  }, [textWarnings]);

  const handleEdit = () => {
    textMutableRef.current = cloneDeep(textActual);
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    setIsLoading(true);
    updateText(textMutableRef.current).then(() => {
      setTextActual(cloneDeep(textMutableRef.current));
      setEditMode(false);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
    });
  };

  const handleUpdateWarning = (updatedWarning) => {
    textMutableRef.current.warnings = textMutableRef.current.warnings.map(warning => {
      return warning.text_warning_id === updatedWarning.text_warning_id ? updatedWarning : warning
    });
    setTextWarnings(textMutableRef.current.warnings);
  };

  const getBoxStyle = () => {
    if (!editMode) {
      return style.mainContainer;
    }
    return {...style.mainContainer, ...style.mainContainerBorder};
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={getBoxStyle()}>
      <List>
        {/* Text preview */}
        <ListItem key={'TextPreview'}>
          <Container disableGutters sx={style.previewContainer}>
            <TextField
              sx={style.text}
              label={name}
              variant='outlined'
              multiline
              value={textActual.localizations.EN.content}
              disabled
              InputLabelProps={{
                style: {
                  color: 'black',
                  fontWeight: 1000,
                },
              }}
              InputProps={{
                style: activeWarningsCount ? style.warning : null,
                startAdornment: (
                  <InputAdornment position='start'>
                    <Checkbox disabled checked={textActual.is_manually_checked} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    {!editMode &&
                      <Button variant='contained' onClick={handleEdit}>EDIT</Button>
                    }
                    {editMode &&
                      <Button variant='outlined' onClick={handleCancel}>CANCEL</Button>
                    }
                  </InputAdornment>
                ),
              }}
            />
          </Container>
        </ListItem>
        {/* Text editable view */}
        <ListItem key={'TextEditableView'}>
          <Collapse in={editMode} sx={{ width: 'fit-content' }} timeout="auto" unmountOnExit>
            <Container disableGutters sx={style.editContainer} maxWidth={false}>
              {/* Original */}
              <List subheader={<ListSubheader>Original</ListSubheader>}>
                <ListItem>
                  <TextField
                    sx={style.text}
                    label={'EN'}
                    variant="outlined"
                    defaultValue={textMutableRef.current.original?.EN.content}
                    multiline
                    disabled
                  />
                </ListItem>
              </List>
              {/* Localizations */}
              <List subheader={<ListSubheader>Localizations</ListSubheader>} sx={{justifyContent: 'flex-start'}}>
                {Object.entries(textMutableRef.current.localizations).map(([lang, localization]) => {
                  return (
                    <ListItem key={lang}>
                      <TextLocalizationView
                        lang={lang}
                        text={textMutableRef.current}
                        localization={localization}
                        onChange={value => (textMutableRef.current.localizations[lang].content = value)}
                        warnings={textWarnings}
                        onUpdateWarning={handleUpdateWarning}
                      />
                    </ListItem>
                  );
                })}
              </List>
              {/* Control buttons */}
              <Container disableGutters sx={style.controlsContainer}>
                <Button sx={style.button} variant="contained" onClick={handleSave}>SAVE</Button>
                <Button sx={style.button} variant="outlined" onClick={handleCancel}>CANCEL</Button>
              </Container>
            </Container>
          </Collapse>
        </ListItem>
      </List>
    </Box>
  );
}

export default Text;

const style = {
  mainContainer: {
    display: 'flex',
    width: 'fit-content',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  mainContainerBorder: {
    borderRadius: 1,
    boxShadow: 5,
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'raw',
    justifyContent: 'flex-start',
    padding: 0,
    margin: 0,
  },
  editContainer: {
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  controlsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    width: 600,
    padding: 0,
    margin: 0,
  },
  button: {
    height: 30,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 2,
  },
  warning: {
    backgroundColor: '#ffd6c9',
  },
};
