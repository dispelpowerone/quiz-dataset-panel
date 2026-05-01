import {
  Box,
  TextField,
  Button,
} from '@mui/material';
import { getImageUrl } from '../libs/dao';

export interface QuestionImageProps {
  readonly domainName?: string;
  readonly image?: string;
}

export function QuestionImage({ domainName, image }: QuestionImageProps) {
  return (
    <Box sx={style.container}>
      {image && (
        <>
          <Box key='curImg' component='img' sx={style.image} src={getImageUrl(domainName ?? '', image)} />
          <Box key='origImg' component='img' sx={style.image} src={`/public/images-orig/${image}`} />
        </>
      )}
      <TextField
        label='Image'
        defaultValue={image}
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
      <Box sx={style.buttonContainer}>
        <Button variant='contained' size='small'>Edit</Button>
      </Box>
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
  },
};
