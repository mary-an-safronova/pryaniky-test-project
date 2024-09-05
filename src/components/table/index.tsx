import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getTableData } from "../../utils/api";
import { TDataItem } from "./types";

export const DocumentTable = () => {
  const [data, setData] = useState<TDataItem[]>([]);

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
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
          {data?.map((row) => (
            <TableRow
              key={row.companySignatureName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {formatDate(row.companySigDate)}
              </TableCell>
              <TableCell align="right">{row.companySignatureName}</TableCell>
              <TableCell align="right">{row.documentName}</TableCell>
              <TableCell align="right">{row.documentStatus}</TableCell>
              <TableCell align="right">{row.documentType}</TableCell>
              <TableCell align="right">{row.employeeNumber}</TableCell>
              <TableCell align="right">
                {formatDate(row.employeeSigDate)}
              </TableCell>
              <TableCell align="right">{row.employeeSignatureName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
