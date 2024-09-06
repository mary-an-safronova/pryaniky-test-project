import { Box, Backdrop, Modal, Fade } from "@mui/material";
import { style } from "./styles";
import { TTransitionsModalProps } from "./types";

export const TransitionsModal = (props: TTransitionsModalProps) => {
  const { open, handleClose, children } = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
};
