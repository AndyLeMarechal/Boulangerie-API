import userDatamapper from "../datamappers/user.datamapper.js";

import createUserSchema from "../validation/schemas/user/create.schema.js";
import updateUserSchema from "../validation/schemas/user/update.schema.js";

import bcrypt from "bcrypt";

export default {
    async getAll(req, res){
        try {
            const users = await userDatamapper.getAll();
            if(!users.length){
                return res.status(404).json('No user found');
            }
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: '500 Internal Server Error' });
        }
    },

    async getOne(req, res){
        const { id } = req.params;
        try {
            const numberId = Number(id);
            if(isNaN(numberId)){
                return res.status(400).json('Invalid id');
            }
            const existingUser = await userDatamapper.getOne(numberId);
            if(!existingUser){
                return res.status(404).json('User not found');
            }
            return res.status(200).json(existingUser);
        } catch (error) {
            return res.status(500).json({ error: '500 Internal Server Error' });
        }
    },

    async create(req, res){
        const data = req.body;
        try {
            const { error } = createUserSchema.validate(data);
            if (error) { return res.status(400).json({ error: { error: '500 Internal Server Error' } }); }

            const userByEmail = await userDatamapper.getByEmail(data.email);
            if(userByEmail){
                return res.status(400).json('Email already used');
            }
            const userByUsername = await userDatamapper.getByUsername(data.username);
            if(userByUsername){
                return res.status(400).json('Username already used');
            }

            if(data.password != data.confirmPassword){
                return res.status(400).json('Passwords do not match');
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);

            const user = await userDatamapper.create({
                username: data.username,
                email: data.email,
                password: hashedPassword,
                firstname: data.firstname,
                lastname: data.lastname,
                address: data.address,
                role: data.role
            });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: '500 Internal Server Error' });
        }
    },

    async update(req, res){
        const { id } = req.params;
        const data = req.body;
        try {
            const numberId = Number(id);
            if(isNaN(numberId)){
                return res.status(400).json('Invalid id');
            }

            const existingUser = await userDatamapper.getOne(numberId);
            if(!existingUser){
                return res.status(404).json('User not found');
            }

            const { error } = updateUserSchema.validate(data);
            if (error) { return res.status(400).json({ error: { error: '500 Internal Server Error' } }); }

            const userByEmail = await userDatamapper.getByEmail(data.email);
            if(userByEmail){
                return res.status(400).json('Email already used');
            }
            const userByUsername = await userDatamapper.getByUsername(data.username);
            if(userByUsername){
                return res.status(400).json('Username already used');
            }

            if(data.password != data.confirmPassword){
                return res.status(400).json('Passwords do not match');
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);

            const user = await userDatamapper.update({
                username: data.username,
                email: data.email,
                password: hashedPassword,
                firstname: data.firstname,
                lastname: data.lastname,
                address: data.address,
                role: data.role, 
                id: numberId
            });
            console.log(user)
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: '500 Internal Server Error' });
        }
    },

    async delete(req, res){
        const { id } = req.params;
        try {
            const numberId = Number(id);
            if(isNaN(numberId)){
                return res.status(400).json('Invalid id');
            }

            const existingUser = await userDatamapper.getOne(numberId);
            if(!existingUser){
                return res.status(404).json('User not found');
            }
    
            const user = await userDatamapper.delete(numberId);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: '500 Internal Server Error' });
        }
    }
}