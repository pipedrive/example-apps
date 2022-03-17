export default async (url, method, payload = {}) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (method !== 'GET') {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(url, options);

  if (method === 'GET' || method === 'POST') {
    return response.json();
  }

  return response;
};
