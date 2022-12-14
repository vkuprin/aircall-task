import AuthService from '../../services/AuthService';

const HOST = 'https://frontend-test-api.aircall.dev/';

const getUserAgent = () => navigator.userAgent;

const headersData = {
  'X-edge-agent': getUserAgent(),
  'content-type': 'application/json',
};

const getHeaders = (token: string | null) => ({
  ...headersData,
  Authorization: `Bearer ${token}`,
});

export const getUserToken = () => {
  try {
    const token = JSON.parse(localStorage.getItem('auth') || '')?.access_token;
    return token;
  } catch (e) {
    return null;
  }
};

export const responseParser = async (response: { json: () => any; }) => {
  let result;
  try {
    result = await response.json();
  } catch {
    result = response;
  }
  return result;
};

export const checkStatus = (response: any) => {
  if (response) {
    return response;
  }
  throw new Error(response.statusText);
};

const errorParser = async (err: any) => {
  console.error(err);
  if (!window.navigator.onLine) {
    throw new Error('No internet connection');
  }

  if (!err || !err.response) {
    return Promise.reject(new Error(err || err.response));
  }

  const errorResponse = await responseParser(err.response);
  const error = { msg: errorResponse, status: err.response.status };
  return Promise.reject(error);
};

const getApiData = async (path: string) => {
  const token = getUserToken();
  const header = { headers: getHeaders(token) };
  const url = `${HOST}${path}`;

  return fetch(url, header)
    .then(checkStatus)
    .then(responseParser)
    .catch(errorParser);
};

const postApiData = async (path: string, body: object) => {
  const url = `${HOST}${path}`;
  const token = getUserToken();

  return fetch(url, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .then(responseParser)
    .catch(errorParser);
};

const deleteApiData = async (path: string) => {
  const url = `${HOST}${path}`;
  const token = localStorage.getItem('token');

  return fetch(url, {
    method: 'DELETE',
    headers: getHeaders(token),
  })
    .then(checkStatus)
    .then(responseParser)
    .catch(errorParser);
};

const putApiData = async (path: string) => {
  const url = `${HOST}${path}`;
  const token = getUserToken();

  return fetch(url, {
    method: 'PUT',
    headers: getHeaders(token),
  })
    .then(checkStatus)
    .then(responseParser)
    .catch(errorParser);
};

export {
  HOST,
  headersData,
  getHeaders,
  getApiData,
  putApiData,
  postApiData,
  deleteApiData,
};
