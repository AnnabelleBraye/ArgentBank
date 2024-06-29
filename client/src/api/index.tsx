const apiUrl = 'http://localhost:3001/api/v1'

/**
 * Api call to log user
 * @param param0 User informations to login (email and password)
 * @returns User token
 */
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

/**
 * Api call to get user profile
 * @param token User token
 * @returns User data
 */
export const getUser = async (token: string) => {
  const response = await fetch(`${apiUrl}/user/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
};

/**
 * Api call to update user data
 * @param param0 Object witch contains user token, user firstName and user lastName
 * @returns User updated
 */
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