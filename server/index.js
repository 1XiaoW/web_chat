// 导入express框架
const express = require('express');
// 导入cors解决跨域请求
const cors = require('cors');
// 导入mongoose，连接mongodb
const mongoose = require('mongoose');
// 导入user路由文件
const userRoutes = require('./routes/userRoutes');
// 导入message路由文件
const messageRoutes = require('./routes/messagesRoute');

// 创建express实例
const app = express();
// 导入dotenv，用于获取.env的配置
require('dotenv').config();
// 导入socket.io实现实时传输
const socket = require('socket.io');

// 使用cors()中间件
app.use(cors());
// 使用express.json()中间件,解析表单中的JSON格式数据
app.use(express.json());

// 连接mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch(err => {
    console.log(err);
  });

// 路由挂载
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

// 测试
app.get('/', (req, res) => {
  res.json({
    start: 'fuck',
  });
});

// 启动服务，监听端口
const server = app.listen(process.env.PORT, () => {
  console.log('server is running at http://localhost:' + process.env.PORT);
});

// 创建socket实例并初始化
const io = socket(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

// 全局对象添加一个属性
global.onlineUsers = new Map();

// 监听连接状态
io.on('connection', socket => {
  global.chatSocket = socket;
  // 监听add-user有无人发送数据
  socket.on('add-user', userId => {
    onlineUsers.set(userId, socket.id);
  });
// 监听send-msg有无人发送数据
  socket.on('send-msg', data => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      // 向msg-receive发送数据
      socket.to(sendUserSocket).emit('msg-receive', data.message);
    }
  });
});
