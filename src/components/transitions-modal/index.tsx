import { Backdrop, Modal, Fade, Container } from "@mui/material";
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
          <Container sx={style}>{children}</Container>
        </Fade>
      </Modal>
    </div>
  );
};
