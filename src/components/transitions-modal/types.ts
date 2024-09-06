import { ReactNode } from "react";

export type TTransitionsModalProps = {
  open: boolean;
  handleClose: () => void;
  children?: ReactNode;
};
