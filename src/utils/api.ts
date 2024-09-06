import { TEntryData } from "../components/doc-entry-form/types";
import { HOST } from "./constants";
import { getCookie } from "./cookie";

const checkResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  const err = await res.json();
  return await Promise.reject(err);
};

// Запрос для авторизации
export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (data && data.data.token) {
    return data;
  }

  return checkResponse(response);
};

// Запрос для получения массива данных для таблицы
export const getTableData = async () => {
  const response = await fetch(
    `${HOST}/ru/data/v3/testmethods/docs/userdocs/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth": getCookie("accessToken").split("Bearer ")[1],
      },
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await response.json();
  if (data) {
    return data;
  }
};

// Запрос для добавления новой записи
export const createDocumentMetadata = async (metadata: TEntryData) => {
  const response = await fetch(
    `${HOST}/ru/data/v3/testmethods/docs/userdocs/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth": getCookie("accessToken").split("Bearer ")[1],
      },
      body: JSON.stringify(metadata),
    }
  );

  return checkResponse(response);
};

// Запрос для изменения записи
export const updateDocumentMetadata = async (
  metadata: TEntryData,
  id: string | undefined
) => {
  const response = await fetch(
    `${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth": getCookie("accessToken").split("Bearer ")[1],
      },
      body: JSON.stringify(metadata),
    }
  );

  return checkResponse(response);
};
