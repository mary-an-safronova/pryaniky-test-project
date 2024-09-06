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
import { deleteDocuments, getTableData } from "../../utils/api";
import { TDataItem } from "./types";
import {
  EnhancedTableToolbar,
  AddDocEntryForm,
  TransitionsModal,
  EditDocEntryForm,
  Confirmation,
} from "..";
import { formatDate } from "../../utils/format-date";

export const DocumentTable = () => {
  const [data, setData] = useState<TDataItem[]>([]);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

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

  // Функция для открытия модальных окон
  const handleModalOpen = (setModalOpen: (arg0: boolean) => void) => () =>
    setModalOpen(true);

  // Функция для закрытия модальных окон
  const handleModalClose = (setModalOpen: (arg0: boolean) => void) => () =>
    setModalOpen(false);

  // Закрытие модального окна с обновлением данных таблицы
  const handleModalCloseWithFetch =
    (setModalOpen: (arg0: boolean) => void) => () => {
      setModalOpen(false);
      fetchData();
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
      // Если чекбокс был отмечен добавляем id выбранного элемента в массив
      newSelected = newSelected.concat(selected, id);
    } else {
      // Если чекбокс был снят убираем id выбранного элемента в массив
      newSelected = selected.filter((item) => item !== id);
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const numSelected = selected.length;
  const rowCount = data.length;

  const selectedData = data?.find((item) => item.id === selected[0]);

  // Удаляем выбранные записи
  const handleDeleteDocEntries = async () => {
    try {
      const responses = await deleteDocuments(selected);
      setOpenDeleteModal(false);
      fetchData();
      console.log(responses);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Неизвестная ошибка");
      }
    }
  };

  return (
    <>
      <EnhancedTableToolbar
        numSelected={selected.length}
        handleAddModalOpen={handleModalOpen(setOpenAddModal)}
        handleEditModalOpen={handleModalOpen(setOpenEditModal)}
        handleDeleteModalOpen={handleModalOpen(setOpenDeleteModal)}
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
      {openAddModal && (
        <TransitionsModal
          open={openAddModal}
          handleClose={handleModalClose(setOpenAddModal)}
        >
          <AddDocEntryForm
            handleClose={handleModalCloseWithFetch(setOpenAddModal)}
          />
        </TransitionsModal>
      )}
      {openEditModal && (
        <TransitionsModal
          open={openEditModal}
          handleClose={handleModalClose(setOpenEditModal)}
        >
          <EditDocEntryForm
            defaultData={selectedData}
            handleClose={handleModalCloseWithFetch(setOpenEditModal)}
          />
        </TransitionsModal>
      )}
      {openDeleteModal && (
        <TransitionsModal
          open={openDeleteModal}
          handleClose={handleModalClose(setOpenDeleteModal)}
        >
          <Confirmation
            btnTitle="Удалить запись"
            onClick={handleDeleteDocEntries}
          />
        </TransitionsModal>
      )}
    </>
  );
};
