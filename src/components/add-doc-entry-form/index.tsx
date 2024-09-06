import { DocEntryForm } from "..";
import { useState } from "react";
import { createDocumentMetadata } from "../../utils/api";
import { TEntryData } from "../doc-entry-form/types";
import { TAddDocEntryFormProps } from "./types";
import { useLoading } from "../../hooks/UseLoading";

export const AddDocEntryForm = (props: TAddDocEntryFormProps) => {
  const { handleClose } = props;
  const { setLoading } = useLoading();

  const [newEntryData, setNewEntryData] = useState<TEntryData>({
    companySigDate: new Date().toISOString(), // Устанавливаем текущее время по умолчанию
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: new Date().toISOString(), // Устанавливаем текущее время по умолчанию
    employeeSignatureName: "",
  });

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await createDocumentMetadata(newEntryData);

      setNewEntryData({
        companySigDate: new Date().toISOString(),
        companySignatureName: "",
        documentName: "",
        documentStatus: "",
        documentType: "",
        employeeNumber: "",
        employeeSigDate: new Date().toISOString(),
        employeeSignatureName: "",
      }); // Устанавливаем поля по умолчанию
      handleClose();
      console.log(response);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Неизвестная ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DocEntryForm
      formTitle="Новая запись"
      btnTitle="Добавить"
      arr={newEntryData}
      setArr={setNewEntryData}
      handleSubmit={handleSubmit}
    />
  );
};
