import bakery_has_articleDatamapper from "../datamappers/bakery_has_article.datamapper.js";

import createBakery_has_articleSchema from "../validation/schemas/bakery_has_article/create.schema.js";
import updateBakery_has_articleSchema from "../validation/schemas/bakery_has_article/update.schema.js";


export default {
    async getAll(req, res){
        try {
            const bakery_has_articles = await bakery_has_articleDatamapper.getAll();
            if(!bakery_has_articles.length){
                return res.status(404).json('No bakery_has_article found');
            }
            return res.status(200).json(bakery_has_articles);
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
            const existingBakery_has_article = await bakery_has_articleDatamapper.getOne(numberId);
            if(!existingBakery_has_article){
                return res.status(404).json('bakery_has_article not found');
            }
            return res.status(200).json(existingBakery_has_article);
        } catch (error) {
            return res.status(500).json({ error: '500 Internal Server Error' });
        }
    },

    async create(req, res){
        const data = req.body;
        try {

            const { error } = createBakery_has_articleSchema.validate(data);
            if (error) { return res.status(400).json({ error: { error: '500 Internal Server Error' } }); }

            const bakery_has_article = await bakery_has_articleDatamapper.create(data);
            return res.status(200).json(bakery_has_article);
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
            const bakery_has_article = await bakery_has_articleDatamapper.update(data, numberId);
            return res.status(200).json(bakery_has_article);
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
            const bakery_has_article = await bakery_has_articleDatamapper.delete(numberId);
            return res.status(200).json(bakery_has_article);
        } catch (error) {
            return res.status(500).json({ error: '500 Internal Server Error' });
        }
    }
}