const HOST = 'https://test.v5.pryaniky.com';

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
