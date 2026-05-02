import {
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Box,
  TextField,
  Button,
} from '@mui/material';
import {
  getImageUrl,
  setQuestionImage,
  uploadQuestionImage,
} from '../libs/dao';

export interface QuestionImageProps {
  readonly domainName?: string;
  readonly questionId?: number;
  readonly image?: string;
  readonly onUpdate?: (image: string) => void;
}

export function QuestionImage({ domainName, questionId, image, onUpdate }: QuestionImageProps) {
  const [editMode, setEditMode] = useState(false);
  const [imageValue, setImageValue] = useState(image ?? '');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setImageValue(image ?? '');
    setError(null);
    setEditMode(false);
    onUpdate?.(image);
  };

  const handleSave = () => {
    setQuestionImage(domainName, questionId, imageValue);
    onUpdate?.(imageValue);
    setError(null);
    setEditMode(false);
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0] ?? null;
    const uploadStatus = await uploadQuestionImage(domainName, questionId, file);
    if (uploadStatus.error_message && uploadStatus.error_message != '') {
      setError(uploadStatus.error_message);
    } else if (uploadStatus.image) {
      setImageValue(uploadStatus.image);
    } else {
      setError("Something is wrong");
    }
    // Allow users to re-select the same file multiple times
    e.target.value = '';
  };

  return (
    <Box sx={style.container}>
      {image && (
        <>
          <Box key='curImg' component='img' sx={style.image} src={getImageUrl(domainName ?? '', imageValue)} />
          <Box key='origImg' component='img' sx={style.image} src={`/public/images-orig/${image}`} />
        </>
      )}
      <TextField
        label='Image'
        value={imageValue}
        onChange={(e) => setImageValue(e.target.value)}
        sx={style.text}
        variant='outlined'
        disabled={!editMode}
        multiline
        InputLabelProps={{
          style: {
            color: 'black',
            fontWeight: 1000,
          },
        }}
      />
      {editMode && (
        <Box sx={style.uploadRow}>
          <Button variant='outlined' size='small' onClick={handleUpload}>Upload</Button>
          <input
            ref={fileInputRef}
            type='file'
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Box>
      )}
      <Box sx={style.buttonContainer}>
        {!editMode && (
          <Button variant='contained' size='small' onClick={handleEdit}>Edit</Button>
        )}
        {editMode && (
          <>
            <Button variant='contained' size='small' onClick={handleSave}>Save</Button>
            <Button variant='outlined' size='small' onClick={handleCancel}>Cancel</Button>
          </>
        )}
      </Box>
      {error && (<Alert severity="error">
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default QuestionImage;

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1,
    padding: 2,
    marginBottom: 2,
    position: 'relative',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 1,
    gap: 1,
  },
  uploadRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    marginTop: 1,
  },
  fileNameField: {
    flex: 1,
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
};
