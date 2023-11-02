// 对axios函数进行二次封装
import { message } from 'ant-design-vue';
import axios from 'axios';

// 利用axios.create方法创建一个axios实例：可以设置基础路径、超时时间
const request = axios.create({
  baseURL: '/api',
  // timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(config => {
  // 一定要将config返回出去不然会卡在这里
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 因为axios返回数据会套一层data，不想那么多data嵌套直接返回response.data
    return response.data;
  },
  error => {
    message.error(error);
  }
);

export default request;
