import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// 导入路由配置
import router from './router';

// 导入Ant Design Vue库
import Antd from 'ant-design-vue';

// 创建Vue应用程序实例，并使用router和Antd插件
createApp(App).use(router).use(Antd).mount('#app');
