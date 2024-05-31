import { Box, Button, Divider, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const ModalDetail =  ({ open, onClose, children }) => {
    return (
      <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography id="modal-title" variant="h6" component="h2">
            Modal Header
          </Typography>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box id="modal-description" mt={2}>
          <Typography variant="body1" gutterBottom>
            <strong>Information Section 1:</strong> Aquí puedes colocar cualquier contenido que desees mostrar en el modal.
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Information Section 2:</strong> Aquí puedes colocar cualquier contenido que desees mostrar en el modal.
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Information Section 3:</strong> Aquí puedes colocar cualquier contenido que desees mostrar en el modal.
          </Typography>
        </Box>
      </Box>
    </Modal>
      );
}
