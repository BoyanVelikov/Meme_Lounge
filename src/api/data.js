import { api } from './api.js';
const url = 'http://localhost:3030/';

export const getAll = async () => await api.get(url + 'data/memes?sortBy=_createdOn%20desc');
export const getById = async id => await api.get(url + 'data/memes/' + id);
export const getMyMemesByUserId = async id => await api.get(url + `data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
export const createItem = async body => await api.post(url + 'data/memes', body, true);
export const updateById = async (id, body) => await api.put(url + 'data/memes/' + id, body, true);
export const deleteById = async id => await api.remove(url + 'data/memes/' + id, null, true);
export const login = async body => await api.post(url + 'users/login', body);
export const register = async body => await api.post(url + 'users/register', body);
export const logout = async () => await api.get(url + 'users/logout', null, true);