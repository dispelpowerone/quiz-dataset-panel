import {
  Box,
  TextField,
  Button,
  Container,
  List,
  ListItem,
  ListSubheader,
  Collapse,
} from '@mui/material';
import TextLocalizationView from './TextLocalization';
import { TextState } from '../libs/text';


export interface TextMimicProps {
  readonly name: string
  readonly text: TextState
  readonly targetState: TextState
}

export function TextMimic({
  name,
  text,
  targetState,
}: TextProps) {
  return (
    <Box sx={[style.mainContainer, style.mainContainerBorder]}>
      <List>
        {/* Text preview */}
        <ListItem key={'TextPreview'}>
          <Container disableGutters sx={style.previewContainer}>
            <TextField
              sx={style.text}
              label={name}
              variant='outlined'
              multiline
              value={text.localizations.EN.content}
              disabled
              InputLabelProps={{
                style: {
                  color: 'black',
                  fontWeight: 1000,
                },
              }}
            />
          </Container>
        </ListItem>
        {/* Text editable view */}
        <ListItem key={'TextEditableView'}>
          <Collapse in={true} sx={{ width: 'fit-content' }} timeout="auto" unmountOnExit>
            <Container disableGutters sx={style.editContainer} maxWidth={false}>
              {/* Original */}
              <List subheader={<ListSubheader>Original</ListSubheader>}>
                <ListItem>
                  <TextField
                    sx={style.text}
                    label={'EN'}
                    variant="outlined"
                    defaultValue={text.original?.EN.content}
                    multiline
                    disabled
                  />
                </ListItem>
              </List>
              {/* Localizations */}
              <List subheader={<ListSubheader>Localizations</ListSubheader>} sx={{justifyContent: 'flex-start'}}>
                {Object.entries(text.localizations).map(([lang, localization]) => {
                  if (localization === null) {
                    return null;
                  }
                  const mimicContent = localization.content;
                  const targetContent = targetState.mutable.localizations[lang]?.content
                  const isContentMismatch = (mimicContent != targetContent);
                  return (
                    <ListItem key={lang}>
                      <Container sx={style.localizationContainer}>
                        <Button
                          sx={isContentMismatch ? null : {visibility: 'hidden'}}
                          variant='outlined'
                          disabled={!isContentMismatch}
                          onClick={() => targetState.updateLocal(lang, mimicContent)}
                        >
                          {'<<'}
                        </Button>
                        <TextLocalizationView
                          lang={lang}
                          text={text}
                          localization={localization}
                          disabled
                          highlighted={isContentMismatch}
                        />
                      </Container>
                    </ListItem>
                  );
                })}
              </List>
            </Container>
          </Collapse>
        </ListItem>
      </List>
    </Box>
  );
}

export default TextMimic;

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
  localizationContainer: {
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
