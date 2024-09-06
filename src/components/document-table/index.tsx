import { ChangeEvent, useEffect, useState } from "react";
import {
  Checkbox,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { getTableData } from "../../utils/api";
import { TDataItem } from "./types";
import { EnhancedTableToolbar, AddDocEntryForm, TransitionsModal } from "..";

export const DocumentTable = () => {
  const [data, setData] = useState<TDataItem[]>([]);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  // Получаем данные таблицы
  const fetchData = async () => {
    try {
      const response = await getTableData();
      setData(response.data);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Неизвестная ошибка");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Открытие, закрытие модального окна
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Закрытие модального окна с обновлением данных таблицы
  const handleCloseWithFetch = () => {
    setOpen(false);
    fetchData();
  };

  // Форматирование дат
  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    };
    const formattedDate = newDate.toLocaleString("ru-RU", options);
    return formattedDate;
  };

  // Выделение всех чекбоксов одним нажатием
  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // Клик на чекбокс
  const handleSelectClick = (_event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const numSelected = selected.length;
  const rowCount = data.length;

  return (
    <>
      <EnhancedTableToolbar
        numSelected={selected.length}
        handleOpen={handleOpen}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{ textAlign: "center" }}>
                <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </TableCell>
              <TableCell>Дата подписания компанией</TableCell>
              <TableCell align="right">Название компании</TableCell>
              <TableCell align="right">Название документа</TableCell>
              <TableCell align="right">Статус документа</TableCell>
              <TableCell align="right">Тип документа</TableCell>
              <TableCell align="right">Номер сотрудника</TableCell>
              <TableCell align="right">Дата подписания сотрудником</TableCell>
              <TableCell align="right">Имя сотрудника</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  key={row.id}
                  sx={{
                    cursor: "pointer",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  onClick={(event) => handleSelectClick(event, row.id)}
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                >
                  <TableCell component="th" scope="row">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{ "aria-labelledby": labelId }}
                    ></Checkbox>
                  </TableCell>
                  <TableCell align="right">
                    {formatDate(row.companySigDate)}
                  </TableCell>
                  <TableCell align="right">
                    {row.companySignatureName}
                  </TableCell>
                  <TableCell align="right">{row.documentName}</TableCell>
                  <TableCell align="right">{row.documentStatus}</TableCell>
                  <TableCell align="right">{row.documentType}</TableCell>
                  <TableCell align="right">{row.employeeNumber}</TableCell>
                  <TableCell align="right">
                    {formatDate(row.employeeSigDate)}
                  </TableCell>
                  <TableCell align="right">
                    {row.employeeSignatureName}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <TransitionsModal open={open} handleClose={handleClose}>
          <AddDocEntryForm handleClose={handleCloseWithFetch} />
        </TransitionsModal>
      )}
    </>
  );
};
