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
  ListSubheader,
  Collapse,
  InputAdornment,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextLocalizationView from './TextLocalization';
import { TextState } from '../libs/text';


export interface TextProps {
  readonly name: string
  readonly textState: TextState
  readonly extendedMode: boolean
  readonly setExtendedMode: (value: boolean) => void
}

export function Text({
  name,
  textState,
  extendedMode,
  setExtendedMode,
}: TextProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [textWarnings, setTextWarnings] = useState([]);
  const [activeWarningsCount, setActiveWarningsCount] = useState(0);

  useEffect(() => {
    setTextWarnings(textState.actual.warnings);
  }, [textState.actual]);

  useEffect(() => {
    setActiveWarningsCount(textWarnings.filter(w => !w.is_manually_checked).length);
  }, [textWarnings]);

  const handleEdit = () => {
    setExtendedMode(true);
  };

  const handleCancel = () => {
    textState.rollbackUpdates();
    setExtendedMode(false);
  };

  const handleSave = () => {
    setIsLoading(true);
    textState.commitUpdates().then(() => {
      setExtendedMode(false);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
    });
  };

  const getBoxStyle = () => {
    if (!extendedMode) {
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
              value={textState.actual.localizations.EN.content}
              disabled
              InputLabelProps={{
                style: {
                  color: 'black',
                  fontWeight: 1000,
                },
              }}
              InputProps={{
                style: activeWarningsCount ? style.warning : null,
                endAdornment: (
                    <InputAdornment position='end'>
                      {!extendedMode &&
                        <Button variant='contained' onClick={handleEdit}>EDIT</Button>
                      }
                      {extendedMode &&
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
          <Collapse in={extendedMode} sx={{ width: 'fit-content' }} timeout='auto' unmountOnExit>
            <Container disableGutters sx={style.editContainer} maxWidth={false}>
              {/* Original */}
              <List subheader={<ListSubheader>Original</ListSubheader>}>
                <ListItem>
                  <TextField
                    sx={style.text}
                    label={'EN'}
                    variant="outlined"
                    defaultValue={textState.mutable.original?.EN.content}
                    multiline
                    disabled
                  />
                </ListItem>
              </List>
              {/* Localizations */}
              <List
                subheader={<ListSubheader>Localizations</ListSubheader>}
                sx={{justifyContent: 'flex-start'}}
              >
                {Object.entries(textState.mutable.localizations).map(([lang, localization]) => {
                  if (localization === null) {
                    return null;
                  }
                  return (
                    <ListItem key={lang}>
                      <TextLocalizationView
                        lang={lang}
                        text={textState.mutable}
                        localization={localization}
                        onChange={value => textState.updateLocale(lang, value)}
                        warnings={textWarnings}
                        onUpdateWarning={textState.updateWarning}
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
