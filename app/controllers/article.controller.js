import articleDatamapper from "../datamappers/article.datamapper.js";
import userDatamapper from "../datamappers/user.datamapper.js";

import createArticleSchema from "../validation/schemas/article/create.schema.js";
import updateArticleSchema from "../validation/schemas/article/update.schema.js";


export default {

    async getAll(req, res){
        try {
            const articles = await articleDatamapper.getAll();
            if(!articles.length){
                return res.status(404).json('No article found');
            }
            return res.status(200).json(articles);
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
            const existingArticle = await articleDatamapper.getOne(numberId);
            if(!existingArticle){
                return res.status(404).json('Article not found');
            }
            return res.status(200).json(existingArticle);
        } catch (error) {
            return res.status(500).json({ error: '500 Internal Server Error' });
        }
    },

    async create(req, res){
        const data = req.body;
        try {
            const { error } = createArticleSchema.validate(data);
            if (error) { return res.status(400).json({ error: { error: '500 Internal Server Error' } }); }

            const existingArticleByType = await articleDatamapper.getByType(data.type);
            if(existingArticleByType){
                return res.status(400).json('Type already used');
            }

            const existingArticleByTitle = await articleDatamapper.getByTitle(data.title);
            if(existingArticleByTitle){
                return res.status(400).json('Title already used');
            }

            const existingUser = await userDatamapper.getOne(data.user_id);
            if(!existingUser){
                return res.status(404).json('User not found');
            }

            const article = await articleDatamapper.create({
                type: data.type,
                title: data.title,
                description: data.description,
                img: data.img,
                price: data.price,
                method_of_conservation: data.method_of_conservation,
                composition: data.composition,
                nutritional_values: data.nutritional_values,
                allergens: data.allergens,
                user_id: data.user_id
            });
            console.log(article);
            return res.status(200).json(article);
        } catch (error) {
            return res.status(500).json(error.message);
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

            const existingArticle = await articleDatamapper.getOne(numberId);
            if(!existingArticle){
                return res.status(404).json('Article not found');
            }

            const { error } = updateArticleSchema.validate(data);
            if (error) { return res.status(400).json({ error: { error: '500 Internal Server Error' } }); }

            const existingArticleByType = await articleDatamapper.getByType(data.type);
            if(existingArticleByType){
                return res.status(400).json('Type already used');
            }

            const existingArticleByTitle = await articleDatamapper.getByTitle(data.title);
            if(existingArticleByTitle){
                return res.status(400).json('Title already used');
            }

            const existingUser = await userDatamapper.getOne(data.user_id);
            if(!existingUser){
                return res.status(404).json('User not found');
            }

            const article = await articleDatamapper.update({
                type: data.type,
                title: data.title,
                description: data.description,
                img: data.img,
                price: data.price,
                method_of_conservation: data.method_of_conservation,
                composition: data.composition,
                nutritional_values: data.nutritional_values,
                allergens: data.allergens,
                user_id: data.user_id,

                id: numberId,
            });
            return res.status(200).json(article);
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
            
            const existingArticle = await articleDatamapper.getOne(numberId);
            if(!existingArticle){
                return res.status(404).json('Article not found');
            }

            const article = await articleDatamapper.delete(numberId);
            return res.status(200).json(article);
        } catch (error) {
            return res.status(500).json({ error: '500 Internal Server Error' });
        }
    }
}