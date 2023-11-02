// 导入user模型
const User = require('../model/userModel');
// 导入brcyptjs用户密码加盐
const brcypt = require('bcryptjs');

// 注册接口处理函数
module.exports.register = async (req, res, next) => {
  try {
    // 从请求体中解构出
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) return res.json({ status: 1, msg: '用户名已经被使用' });
    const emailCheck = await User.findOne({ email });
    if (emailCheck) return res.json({ status: 1, msg: '邮箱已经被使用' });
    const hashedPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    user.password = undefined;
    return res.json({
      status: 0,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// 登录接口处理函数
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.json({ status: 1, msg: '用户名或密码不正确' });
    const isPasswordValid = await brcypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ status: 1, msg: '用户名或密码不正确' });

    user.password = undefined;

    return res.json({
      status: 0,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// 设置头像接口处理函数
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    console.log(error);
  }
};

// 获取用户接口处理函数
module.exports.allUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ]);
    return res.json(users);
  } catch (error) {
    console.log(error);
  }
};
