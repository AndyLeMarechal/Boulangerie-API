import userDatamapper from '../datamappers/user.datamapper.js';

import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import createUserSchema from '../validation/schemas/user/create.schema.js';

export default {

  async postSignUp(req, res) {
    const data = req.body;

    const createdUserSchema = createUserSchema;

    const { error } = createdUserSchema.validate(data);
    if (error) { return res.status(400).json({ error: { error: '500 Internal Server Error' } }); }

    if (data.password !== data.passwordConfirm) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUserByUsername = await userDatamapper.getByEmail(data.username);
    const existingUserByEmail = await userDatamapper.getByEmail(data.email);

    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email is already in use' });
    }
    if (existingUserByUsername) {
      return res.status(400).json({ error: 'Username is already in use' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await userDatamapper.createUser({
      email: data.email,
      username: data.username,
      password: hashedPassword,
      firstname: data.firstname,
      lastname: data.lastname,
      role: 'member',
    });
    return res.status(200).json({ message: 'User has been created' });
  },

  async postLogin(req, res) {
    const data = req.body;

    if (data.email && data.password) {
      const existingUser = await userDatamapper.getByEmail(data.email);
      if (!existingUser) {
        return res.status(400).json({ error: 'User not found' });
      }
      const isSamePassword = await bcrypt.compare(
        data.password,
        existingUser.password,
      );
      if (isSamePassword) {
        const token = jwt.sign({
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email,
          role: existingUser.role,
          img: existingUser.img,
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING });
        const jwtData = token.split('.')[1];
        const parseJwtData = JSON.parse(atob(jwtData));
        return res.status(200).json(
          {
            access_token: token,
            id: parseJwtData.id,
            role: parseJwtData.role,
            username: parseJwtData.username,
          },
        );
      }
      return res.status(400).json({ error: 'Password is incorrect' });
    }
    return res.status(400).json('Incorrect password or email');
  },
};