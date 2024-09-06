export type TEntryData = {
  companySigDate?: string;
  companySignatureName?: string;
  documentName?: string;
  documentStatus?: string;
  documentType?: string;
  employeeNumber?: string;
  employeeSigDate?: string;
  employeeSignatureName?: string;
};

export type TDocEntryFormProps = {
  formTitle: string;
  btnTitle: string;
  arr: TEntryData;
  setArr: (arr: TEntryData) => void;
  handleSubmit: (event: { preventDefault: () => void }) => void;
};
