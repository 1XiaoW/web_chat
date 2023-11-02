import { createRouter, createWebHistory } from 'vue-router';
import Register from './pages/Register.vue';
import Login from './pages/Login.vue';
import Chat from './pages/Chat.vue';
import SetAvatar from './pages/SetAvatar.vue';

// 导入所需的模块和组件

const routes = [
  { path: '/register', component: Register }, // 路由路径为/register时，渲染Register组件
  { path: '/login', component: Login }, // 路由路径为/login时，渲染Login组件
  { path: '/setAvatar', component: SetAvatar }, // 路由路径为/setAvatar时，渲染SetAvatar组件
  { path: '/', component: Chat }, // 默认路由路径为/时，渲染Chat组件
];

const router = createRouter({
  history: createWebHistory(), // 创建基于浏览器历史记录的路由模式
  routes, // 使用上面定义的路由规则
});

export default router; // 导出router对象供其他地方使用
