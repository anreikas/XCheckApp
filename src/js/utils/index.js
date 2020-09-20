import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://x-check.herokuapp.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const tasksAPI = {
  async getTasks() {
    const response = await instance.get('tasks');
    return response.data;
  },
  async saveTask(task) {
    const response = await instance.post(`tasks`, task);
    return response.data;
  },
  async updateTask(id, task) {
    const response = await instance.put(`tasks/${id}`, task);
    return response.data;
  },
}


export const usersAPI = {
  async getUser(id) {
    const response = await instance.get(`users?githubId=${id}`);
    const data = await response.data;
    return data;
  },
  async setUser(id, githubId, roles) {
    const response = await instance.post('users', { id, githubId, roles });
    return response.data;
  },
  async updateUser(id, githubId, roles) {
    const response = await instance.put(`users/${id}`, { id, githubId, roles });
    return response.data;
  },
}

/* eslint-disable indent */
/* eslint-disable spaced-comment */
/* eslint-disable no-unreachable */

const URL_DATA_SEPARATOR = '&';

export const UrlConstructor = (url, params, options = {}) => {
  const { separator = URL_DATA_SEPARATOR, equalSign = '=' } = options;

  return `${url}?${
    Object.entries(params)
      .map((el) => el.join(equalSign))
      .join(separator)
  }`;
};

export const UrlPath = (...args) => args.join('/');

export const FetchReq = async (url, method = 'GET', data) => {
  console.log('@FetchReq : url', url);
  const req = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    req.body = data;
  }

  const response = await fetch(url, req).catch();

  if (!response.ok) {
    const error = Object.assign(Error.prototype, {
      response,
    });

    throw error;
  }

  const result = await response.json();

  return result;
};

export const TextSorter = (a, b) => {
  const nameA = a.author.toLowerCase();
  const nameB = b.author.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) return 1;
  return 0; // Никакой сортировки
};

/* eslint-disable indent */
/* eslint-disable spaced-comment */
/* eslint-disable no-unreachable */

const URL_DATA_SEPARATOR = '&';

export const UrlConstructor = (url, params, options = {}) => {
  const { separator = URL_DATA_SEPARATOR, equalSign = '=' } = options;

  return `${url}?${
    Object.entries(params)
      .map((el) => el.join(equalSign))
      .join(separator)
    }`;
};

export const UrlPath = (...args) => args.join('/');

export const FetchReq = async (url, method = 'GET', data) => {
  console.log( '@FetchReq : url', url );
  const req = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    req.body = data;
  }

  const response = await fetch(url, req).catch();

  if (!response.ok) {
    const error = Object.assign(Error.prototype, {
      response,
    });

    throw error;
  }

  const {headers} = response;
  // X-Total-Count
  console.log( '@FetchReq : ', headers );

  const result = await response.json();

  return result;
};
