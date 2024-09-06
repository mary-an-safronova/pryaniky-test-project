import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { EnhancedTableToolbarProps } from "./types";

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, handleOpen } = props;

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Документы
        </Typography>
      )}
      <Tooltip title="Добавить">
        <span>
          <IconButton onClick={handleOpen} disabled={numSelected > 0}>
            <LibraryAddIcon color={numSelected < 1 ? "inherit" : "disabled"} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Изменить">
        <span>
          <IconButton
            onClick={() => console.log("CLICK ON EDIT BTN")}
            disabled={numSelected !== 1}
          >
            <EditIcon color={numSelected === 1 ? "inherit" : "disabled"} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Удалить">
        <span>
          <IconButton
            onClick={() => console.log("CLICK ON DELETE BTN")}
            disabled={numSelected === 0}
          >
            <DeleteIcon color={numSelected > 0 ? "inherit" : "disabled"} />
          </IconButton>
        </span>
      </Tooltip>
    </Toolbar>
  );
};
