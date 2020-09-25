import Axios from "axios";

const instance = Axios.create({
  baseURL: 'https://x-check.herokuapp.com/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

export const tasksAPI = {
  async getTasks() {
    const response = await instance.get(`tasks`);
    return response.data;
  }
}

export const usersAPI = {
  async getUser(id) {
    const response = await instance.get(`users?githubId=${id}`);
    const data = await response.data;
    return data;
  },
  async setUser(id, githubId, roles) {
    const response = await instance.post(`users`, {id, githubId, roles});
    return response.data;
  },
  async updateUser(id, githubId, roles) {
    const response = await instance.put(`users/${id}`, {id, githubId, roles});
    return response.data;
  },
}

export const reviewRequests = {
  async getRequests() {
    const response = await instance.get(`reviewRequests`);
    const data = await response.data;
    return data;
  },
  async getTask() {
    const response = await instance.get(`tasks`);
    const data = await response.data;
    return data;
  },
  async postRequest(obj) {
    const response = await instance.post(`reviewRequests`, obj);
    const data = await response.data;
    return data;
  },
  

}
