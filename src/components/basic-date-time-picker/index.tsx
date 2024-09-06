import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TBasicDateTimePickerProps } from "./types";

export const BasicDateTimePicker = (props: TBasicDateTimePickerProps) => {
  const { label, date, onDateChange } = props;
  const [value, setValue] = useState<Dayjs | null | undefined>(dayjs(date));

  useEffect(() => {
    setValue(dayjs(date)); // Обновляем значение при изменении пропса date
  }, [date]);

  const onChangeInput = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (newValue) {
      onDateChange(newValue.toISOString()); // Передаем новое значение в родительский компонент
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker label={label} value={value} onChange={onChangeInput} />
      </DemoContainer>
    </LocalizationProvider>
  );
};
