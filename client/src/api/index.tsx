const apiUrl = 'http://localhost:3001/api/v1'

export const userLogin = async ({
  email,
  password
}: {
  email: string,
  password: string
}) => {
  const response = await fetch(`${apiUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ email: email, password }),
  });

  const data = await response.json();

  if (data.status !== 200) {
    throw new Error(data.message)
  }

  return data.body.token;
};

export const getUser = async (token: string) => {
  const response = await fetch(`${apiUrl}/user/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log('data', data);

  return data;
};

export const updateUser = async ({
  token,
  firstName,
  lastName
}: {
  token: string,
  firstName: string,
  lastName: string
}) => {
  const response = await fetch(`${apiUrl}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  });

  const data = await response.json();
  return data;
};