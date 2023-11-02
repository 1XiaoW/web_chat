import request from '../utils/request';

export const reqRegister = data => request.post('/auth/register', data);

export const reqLogin = data => request.post('/auth/login', data);

export const reqSetAvatar = (id, data) =>
  request.post('/auth/setAvatar/' + id, data);

export const reqAllUsers = id => request.get('/auth/allUsers/' + id);

export const reqAddMsg = data => request.post('/messages/addMessage', data);

export const reqGetAllMessage = data =>
  request.post('/messages/getAllMessage', data);
