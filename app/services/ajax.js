const verifyStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error('Error response on request');
};

export default {
  get(url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(verifyStatus)
    .then((response) => response.json());
  },
  post(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(verifyStatus)
    .then((response) => response.json());
  },
  patch(url, data) {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(verifyStatus)
    .then((response) => response.json());
  },
  put(url, data) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(verifyStatus)
    .then((response) => response.json());
  }
};
