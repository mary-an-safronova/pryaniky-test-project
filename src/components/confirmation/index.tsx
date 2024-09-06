import { Button } from "@mui/material";
import { TConfirmationProps } from "./types";

export const Confirmation = (props: TConfirmationProps) => {
  const { btnTitle, onClick } = props;
  return (
    <Button
      variant="contained"
      fullWidth
      size="large"
      color="primary"
      sx={{ mt: 3, mb: 3 }}
      onClick={onClick}
    >
      {btnTitle}
    </Button>
  );
};
