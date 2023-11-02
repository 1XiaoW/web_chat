// 解构出接口处理函数

const {
  addMessage,
  getAllMessage,
} = require('../controllers/messagesController');

const router = require('express').Router();

// 请求处理
router.post('/addMessage', addMessage);
router.post('/getAllMessage', getAllMessage);

module.exports = router;
