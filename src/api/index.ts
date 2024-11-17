const makeRequest = async (url: string, method: string, data?: any) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      access_token: token ?? '',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const loginRequest = async ({
  username,
  password,
}: {
  username?: string;
  password?: string;
}) => {
  return await makeRequest('http://localhost:8080/login', 'POST', {
    username,
    password,
  });
};

export const registerRequest = async ({
  username,
  password,
}: {
  username?: string;
  password?: string;
}) => {
  return await makeRequest('http://localhost:8080/register', 'POST', {
    username,
    password,
  });
};

export const sendMessageRequest = async ({
  message,
  activeChatId,
}: {
  message: string;
  activeChatId: string;
}) => {
  return await makeRequest('http://localhost:8080/chat', 'POST', {
    message,
    activeChatId,
  });
};

export const getChatsRequest = async () => {
  return await makeRequest('http://localhost:8080/chat', 'GET');
};

export const checkTokenRequest = async () => {
  try {
    return await makeRequest('http://localhost:8080/login', 'GET');
  } catch {
    return null;
  }
};

export const newChatRequest = async () => {
  return await makeRequest('http://localhost:8080/chat/newChat', 'GET');
}