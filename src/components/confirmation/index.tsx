import { useLoading } from "../../hooks/UseLoading";
import { TConfirmationProps } from "./types";
import { LoadingButton } from "@mui/lab";

export const Confirmation = (props: TConfirmationProps) => {
  const { btnTitle, onClick } = props;
  const { loading } = useLoading();

  return (
    <LoadingButton
      variant="contained"
      fullWidth
      size="large"
      color="primary"
      sx={{ mt: 3, mb: 3 }}
      onClick={onClick}
      loadingPosition="center"
      loading={loading}
    >
      {btnTitle}
    </LoadingButton>
  );
};
