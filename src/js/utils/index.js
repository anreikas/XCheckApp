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
};

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
};

export const reviewRequests = {
  async getRequests() {
    const response = await instance.get('reviewRequests');
    const data = await response.data;
    return data;
  },

  async getTask(id) {
    const response = await instance.get(`tasks/${id}`);
    const data = await response.data;
    return data;
  },
  async postRequest(obj) {
    const response = await instance.post('reviewRequests', obj);
    const data = await response.data;
    return data;
  },
  async postReview(review) {
    const response = await instance.post('reviews', review);
    const data = await response.data;
    return data;
  },
  async getRequestById(id) {
    const response = await instance.get(`reviewRequests/${id}`);
    const data = await response.data;
    return data;
  },
  async updateRequest(request) {
    const { id } = request;
    const response = await instance.put(`reviewRequests/${id}`, request);
    const data = await response.data;
    return data;
  },
  async getRequestByTaskId(taskId, author) {
    const response = await instance.get(`reviewRequests?task=${taskId} ${author ? `&author=${author}` : ''}`);
    const data = await response.data;
    return data;
  },
};

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

  const Total = Number(response.headers.get('X-Total-Count'));

  if (!Number.isNaN(Total)) {
    result.Total = Total;
  }

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
