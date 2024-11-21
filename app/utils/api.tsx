const request = (path: string, method = 'GET', body: Record<string, unknown> | null = null, token: string) => {
  return fetch(path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: body ? JSON.stringify(body) : null,
  });
};
export default request;
