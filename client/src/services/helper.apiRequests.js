'use strict';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

async function request(
  url,
  options = {},
  errorMessage = 'Request failed'
) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(errorMessage);
  }

  return res.json();
}

export function get(url, errorMessage) {
  return request(url, {}, errorMessage);
}

export function post(url, body, errorMessage) {
  return request(
    url,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
    errorMessage
  );
}

export function put(url, body, errorMessage) {
  return request(
    url,
    {
      method: 'PUT',
      body: JSON.stringify(body),
    },
    errorMessage
  );
}
