import {
  useState,
  useRef,
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
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
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
  const textMutableRef = useRef(text);

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

  const handleCheckedStatus = (event) => {
    textMutableRef.current.is_manually_checked = event.target.checked;
  };

  const getBoxStyle = () => {
    if (!editMode) {
      return style.mainContainer;
    }
    return {...style.mainContainer, ...style.border};
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
              value={textActual.localizations.EN}
              disabled
              InputLabelProps={{
                style: {
                  color: 'black',
                  fontWeight: 1000,
                },
              }}
              InputProps={{
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
          <Collapse in={editMode} sx={{flex: 1}} timeout="auto" unmountOnExit>
            <Container disableGutters sx={style.mainContainer}>
              <FormControlLabel
                control={
                  <Checkbox defaultChecked={textMutableRef.current.is_manually_checked} />
                }
                onChange={handleCheckedStatus}
                label={'Manually checked'}
                sx={{ marginLeft: 1 }}
              />
              {/* Original */}
              <List subheader={<ListSubheader>Original</ListSubheader>}>
                <ListItem>
                  <TextField
                    sx={style.text}
                    label={'EN'}
                    variant="outlined"
                    defaultValue={textMutableRef.current.original?.EN}
                    multiline
                    disabled
                  />
                </ListItem>
              </List>
              {/* Localizations */}
              <List subheader={<ListSubheader>Localizations</ListSubheader>}>
                {Object.entries(textMutableRef.current.localizations).map(([lang, content]) => {
                  return (
                    <ListItem key={lang}>
                      <TextField
                        sx={style.text}
                        label={lang}
                        variant="outlined"
                        defaultValue={content}
                        multiline
                        onChange={e => (textMutableRef.current.localizations[lang] = e.target.value)}
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
    flexDirection: 'column',
    justifyContent: 'flex-begin',
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'raw',
    justifyContent: 'flex-begin',
    padding: 0,
    margin: 0,
  },
  controlsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  border: {
    borderRadius: 1,
    boxShadow: 1,
  },
  text: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  button: {
    height: 30,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 2,
  },
};
