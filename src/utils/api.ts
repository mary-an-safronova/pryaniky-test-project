import { HOST } from "./constants";
import { getCookie } from "./cookie";

const checkResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  const err = await res.json();
  return await Promise.reject(err);
};

export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (data && data.data.token) {
    return data;
  }

  return checkResponse(response);
};

export const getTableData = async () => {
    const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth": getCookie('accessToken').split('Bearer ')[1],
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }
  
    const data = await response.json();
    if (data) {
      return data;
    }
  };
