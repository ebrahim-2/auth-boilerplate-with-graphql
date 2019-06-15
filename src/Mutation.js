const db = require("./models");
const bcrypt = require("bcrypt");
const uuidv4 = require("uuid/v4");
const { sendMail } = require("./services");

async function register(root, { data }, context, info) {
  const user = await db.User.findOne({ email: data.email });

  if (user) throw new Error("Email is in use please try another one");

  const password = await bcrypt.hash(data.password, 10);
  const newUser = await db.User.create({ ...data, password });
  return newUser;
}

async function login(root, { data }, context, info) {
  const user = await db.User.findOne({ email: data.email });

  if (!user) throw new Error("There is no user with this email");

  const matched = await bcrypt.compare(data.password, user.password);

  if (!matched) throw new Error("Wrong password");

  return user;
}

async function forgotPassword(root, { email }, context, info) {
  const user = await db.User.findOne({ email: email });

  if (!user) throw new Error("There is no user with this email");

  const token = uuidv4();
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();
  await sendMail(user.email, token);
  
  return "Reset password token sended successfully please check your email";
}

async function changePassword(root, { token, password }, context, info) {
  const user = await db.User.findOne({ resetPasswordToken: token });

  if (!user || user.resetPasswordExpires > Date.now())
    throw new Error("Reset password token is invalid or expired");

  const newPassword = await bcrypt.hash(password, 10);

  user.password = newPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  return user;
}

module.exports = { register, login, forgotPassword, changePassword };
