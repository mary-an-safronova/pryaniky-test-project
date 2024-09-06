import { useState } from "react";
import { TEditDocEntryFormProps } from "./types";
import { TEntryData } from "../doc-entry-form/types";
import { DocEntryForm } from "..";
import { updateDocumentMetadata } from "../../utils/api";

export const EditDocEntryForm = (props: TEditDocEntryFormProps) => {
  const { defaultData, handleClose } = props;

  const [entryData, setEntryData] = useState<TEntryData>({
    companySigDate: defaultData?.companySigDate,
    companySignatureName: defaultData?.companySignatureName,
    documentName: defaultData?.documentName,
    documentStatus: defaultData?.documentStatus,
    documentType: defaultData?.documentType,
    employeeNumber: defaultData?.employeeNumber,
    employeeSigDate: defaultData?.employeeSigDate,
    employeeSignatureName: defaultData?.employeeSignatureName,
  });

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await updateDocumentMetadata(entryData, defaultData?.id);
      handleClose();
      console.log(response);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Неизвестная ошибка");
      }
    }
  };

  return (
    <DocEntryForm
      formTitle="Изменить запись"
      btnTitle="Сохранить"
      arr={entryData}
      setArr={setEntryData}
      handleSubmit={handleSubmit}
    />
  );
};
