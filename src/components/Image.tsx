import {
  useState,
  useRef,
} from 'react';
import {
  Box,
  TextField,
  Button,
  Container,
  Collapse,
  InputAdornment,
} from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import { updateQuestionImage } from '../libs/dao';

const questionId = 1;
const image = '202003051658529900_Normal.png';

export interface ImageProps {
  readonly questionId: number
  readonly image: string
  readonly editable: boolean
}

export function Image() {
  const [editMode, setEditMode] = useState(false);
  const [actualImage, setActualImage] = useState(image);
  const mutableImageRef = useRef(image);

const handleEdit = () => {
    mutableImageRef.current = cloneDeep(actualImage);
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    setIsLoading(true);
    updateQuestionImage(questionId, mutableImageRef.current).then(() => {
      setActualImage(cloneDeep(mutableImageRef.current));
      setEditMode(false);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
    });
  };

  return (
    <Container disableGutters sx={style.mainContainer}>
      <Box component='img' sx={style.image} src={`/public/images/${actualImage}`} />
      <Box component='img' sx={style.image} src={`/public/images-orig/${actualImage}`} />
      <TextField
        sx={style.text}
        label={'Image'}
        variant='outlined'
        multiline
        value={editMode ? undefined : actualImage}
        disabled={!editMode}
        InputLabelProps={{
          shrink: true,
          style: {
            color: 'black',
            fontWeight: 1000,
          },
        }}
        InputProps={{
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
      <Collapse in={editMode} sx={{flex: 1}} timeout='auto' unmountOnExit>
        <TextField
          sx={style.text}
          label={'New image file name'}
          variant='outlined'
          multiline
          defaultValue={actualImage}
          InputLabelProps={{
            style: {
              color: 'black',
              fontWeight: 1000,
            },
          }}
        />
        {/* Control buttons */}
        <Container disableGutters sx={style.controlsContainer}>
          <Button sx={style.button} variant='contained' onClick={handleSave}>SAVE</Button>
          <Button sx={style.button} variant='outlined' onClick={handleCancel}>CANCEL</Button>
        </Container>
      </Collapse>
    </Container>
  );
}

export default Image;

const style = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-begin',
    gap: 2,
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
    gap: 2,
  },
  text: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  button: {
    height: 30,
  },
  image: {
    height: 150,
    width: 375,
    borderRadius: 1,
    boxShadow: 1,
    padding: 1,
  },
};
