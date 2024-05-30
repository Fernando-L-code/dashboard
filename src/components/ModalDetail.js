import { Button, Modal } from '@mui/material';
import React from 'react'

export const ModalDetail =  ({ open, onClose, children }) => {
    return (
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ backgroundColor: "white", padding: "20px" }}>
            {children}
            <Button onClick={onClose}>Cerrar Modal</Button>
          </div>
        </Modal>
      );
}
