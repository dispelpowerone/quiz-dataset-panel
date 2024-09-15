import {
  Box,
} from '@mui/material';
import Image from '../components/Image';


export function Boo() {
  return (
    <Box sx={style.container}>
      <Image />
    </Box>
  );
}

export default Boo;

const style = {
  container: {
    width: '100%',
    maxWidth: 640,
    bgcolor: 'background.paper',
    padding: 4,
    margin: 2,
    borderRadius: 1,
    boxShadow: 2,
  },
};
