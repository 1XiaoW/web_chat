// 解构出接口处理函数
const {
  register,
  login,
  setAvatar,
  allUsers,
} = require('../controllers/usersController');

const router = require('express').Router();

// 请求处理
router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);
router.get('/allUsers/:id', allUsers);

module.exports = router;
