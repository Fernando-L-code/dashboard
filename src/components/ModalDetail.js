import { Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemText, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';

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

export const ModalDetail =  ({ open, onClose, data, error  }) => {
  const details1 = [
    { label: 'Número de Orden', value: data?.orderNumber },
    { label: 'Courier', value: data?.courier },
    { label: 'Número de Seguimiento', value: data?.trackingNumber },
    { label: 'Nombre del Cliente', value: data?.customerName },
    { label: 'Correo del Cliente', value: data?.customerEmail },
  ];

  const details2 = [
    { label: 'Ciudad del Cliente', value: data?.customerCity },
    { label: 'Provincia del Cliente', value: data?.customerProvince },
    { label: 'Código Postal del Cliente', value: data?.customerZip },
    { label: 'Estado', value: data?.status },
    { label: 'Fecha de Cumplimiento', value:  moment.utc(data?.fulfillmentDate).format("D/MMMM/YYYY") },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', md: 600 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography id="modal-title" variant="h6" component="h2">
          Detalles de envío
          </Typography>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box id="modal-description" mt={2}>
          {error ? (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          ) : (
            data && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <List>
                    {details1.map((detail, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={detail.label} secondary={detail.value} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
                    {details2.map((detail, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={detail.label} secondary={detail.value} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            )
          )}
        </Box>
      </Box>
    </Modal>
  );
};
