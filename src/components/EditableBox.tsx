import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


export interface EditableBoxProps {
  readonly children: React.ReactNode;
  readonly onEdit: () => void;
  readonly onSave: () => void;
  readonly onCancel: () => void;
  readonly sx;
}

export function EditableBox({
  children,
  onEdit,
  onSave,
  onCancel,
  sx,
}: EditableBoxProps) {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    onEdit();
    setEditMode(true);
  };

  const handleCancel = () => {
    onCancel();
    setEditMode(false);
  };

  const handleSave = () => {
    onSave();
    setEditMode(false);
  };

  return (
    <Box sx={{ flex: 1, width: '100%', ...sx }}>
    {children}
    <Container disableGutters sx={style.controlsContainer}>
      {editMode && <>
        <Button sx={style.button} variant="contained" onClick={handleSave}>SAVE</Button>
        <Button sx={style.button} variant="outlined" onClick={handleCancel}>CANCEL</Button>
      </>}
      {!editMode && <>
        <Button sx={style.button} variant="contained" onClick={handleEdit}>EDIT</Button>
      </>}
    </Container>
    </Box>
  );
}

export default EditableBox;

const style = {
  controlsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 1,
  },
};
