const db = require("./models");
const bcrypt = require("bcrypt");

async function register(root, { data }, context, info) {
  // check if the user exists
  const user = await db.User.findOne({ email: data.email });

  if (user) throw new Error("Email is in use please try another one");

  const password = await bcrypt.hash(data.password, 10);
  const newUser = await db.User.create({ ...data, password });
  return newUser;
}

async function login(root, { data }, context, info) {
  const user = await db.User.findOne({ email: data.email });

  if (!user) throw new Error("There is no email with this email");

  const matched = await bcrypt.compare(data.password, user.password);
  if (!matched) throw new Error("Wrong password");
  
  return user;
}

module.exports = { register, login };
