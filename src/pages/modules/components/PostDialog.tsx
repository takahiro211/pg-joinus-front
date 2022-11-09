import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Box,
} from "@mui/material";
import Button from "./Button";

export type PostDialogProps = {
  onClose: (value: string) => void;
  title?: string;
  message?: string;
  mode?: string;
};

export function PostDialog(props: PostDialogProps) {
  const { onClose, title, message, mode } = props;

  return (
    <Dialog open onClose={() => onClose("close")}>
      <Box sx={{ p: 4 }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onClose("cancel")}
            size="small"
            color="primary"
            variant="contained"
            autoFocus
          >
            キャンセル
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => onClose("ok")}
          >
            {mode}する
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
