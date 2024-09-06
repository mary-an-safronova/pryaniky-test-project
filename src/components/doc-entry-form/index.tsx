import { Box, TextField, Typography } from "@mui/material";
import { BasicDateTimePicker } from "..";
import { TDocEntryFormProps } from "./types";
import { LoadingButton } from "@mui/lab";
import { useLoading } from "../../hooks/UseLoading";

export const DocEntryForm = (props: TDocEntryFormProps) => {
  const { formTitle, btnTitle, arr, setArr, handleSubmit } = props;
  const { loading } = useLoading();

  // Функция для обновления полей ввода
  const onChangeInput = (e: { target: { name: string; value: string } }) => {
    setArr({
      ...arr,
      [e.target.name]: e.target.value,
    });
  };

  // Функция для обновления даты
  const handleDateChange = (newDate: string, field: keyof typeof arr) => {
    setArr({
      ...arr,
      [field]: newDate, // Обновляем состояние при изменении даты
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
        {formTitle}
      </Typography>
      <BasicDateTimePicker
        label={"Дата подписания компанией"}
        date={arr.companySigDate}
        onDateChange={(newDate) => handleDateChange(newDate, "companySigDate")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="companySignatureName"
        name="companySignatureName"
        label="Название компании"
        type="text"
        value={arr.companySignatureName}
        onChange={onChangeInput}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="documentName"
        name="documentName"
        label="Название документа"
        type="text"
        value={arr.documentName}
        onChange={onChangeInput}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="documentStatus"
        name="documentStatus"
        label="Статус документа"
        type="text"
        value={arr.documentStatus}
        onChange={onChangeInput}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="documentType"
        name="documentType"
        label="Тип документа"
        type="text"
        value={arr.documentType}
        onChange={onChangeInput}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="employeeNumber"
        name="employeeNumber"
        label="Номер сотрудника"
        type="text"
        value={arr.employeeNumber}
        onChange={onChangeInput}
      />
      <BasicDateTimePicker
        label={"Дата подписания сотрудником"}
        date={arr.employeeSigDate}
        onDateChange={(newDate) => handleDateChange(newDate, "companySigDate")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="employeeSignatureName"
        name="employeeSignatureName"
        label="Имя сотрудника"
        type="text"
        value={arr.employeeSignatureName}
        onChange={onChangeInput}
      />
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        disabled={!arr.companySignatureName || !arr.documentName}
        loadingPosition="center"
        loading={loading}
      >
        {btnTitle}
      </LoadingButton>
    </Box>
  );
};
