import bakeryDatamapper from "../datamappers/bakery.datamapper.js";
import articleDatamapper from "../datamappers/article.datamapper.js";
import bakery_has_articleDatamapper from "../datamappers/bakery_has_article.datamapper.js";

import createBakerySchema from "../validation/schemas/bakery/create.schema.js";
import updateBakerySchema from "../validation/schemas/bakery/update.schema.js";

import createBakery_has_articleSchema from "../validation/schemas/bakery_has_article/create.schema.js";
import updateBakery_has_articleSchema from "../validation/schemas/bakery_has_article/update.schema.js";


export default {

    async getAll(req, res){
        try {
            const getAllBakery = await bakeryDatamapper.getAll();
            if(!getAllBakery.length){
                return res.status(404).json('No bakery found');
            }
            const bakeries = [];
            for (let i = 0; i < getAllBakery.length; i++) {
                const existingArticle = await articleDatamapper.getOneByBakeryId(getAllBakery[i].article_id);
                if(existingArticle){
                    getAllBakery[i].article = existingArticle;
                }else {
                    getAllBakery[i].article = null;
                }
                bakeries.push(getAllBakery[i]);
            }
            return res.status(200).json(bakeries);
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
            const existingBakery = await bakeryDatamapper.getOne(numberId);
            if(!existingBakery){
                return res.status(404).json('Bakery not found');
            }

            const existingArticle = await articleDatamapper.getOneByBakeryId(existingBakery.id);

            for (let i = 0; i < existingArticle.length; i++) {
                if(existingArticle[i]){
                    existingBakery.article = existingArticle;
                }else {
                    existingBakery.article = null;
                }
            }
            return res.status(200).json(existingBakery);
        } catch (error) {
            return res.status(500).json({ error: '500 Internal Server Error' });
        }
    },

    async create(req, res){
        const data = req.body;
        try {
            const { error } = createBakerySchema.validate(data);
            if (error) { return res.status(400).json({ error: { error: '500 Internal Server Error' } }); }

            const existingBakeryByTitle = await bakeryDatamapper.getByTitle(data.title);
            if(existingBakeryByTitle){
                return res.status(400).json('Title already used');
            }

            if(data.article_id && data.bakery_id){
            const existingBakery_has_article = await bakery_has_articleDatamapper.getByTwoIds(data.bakery_id, data.article_id);
            if(existingBakery_has_article){
                return res.status(400).json('Bakery has already this article');
            }

            const bakery = await bakeryDatamapper.create(data);
            await bakeryDatamapper.create({
                bakery_id: data.bakery_id,
                article_id: data.article_id
            });
            return res.status(200).json(bakery);
            }else {
                const bakery = await bakeryDatamapper.create(data);
                return res.status(200).json(bakery);
            }

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

            const existingBakery = await bakeryDatamapper.getOne(numberId);
            if(!existingBakery){
                return res.status(404).json('Bakery not found');
            }

            const { error } = updateBakerySchema.validate(data);
            if (error) { return res.status(400).json({ error: { error: '500 Internal Server Error' } }); }

            const existingBakeryByTitle = await bakeryDatamapper.getByTitle(data.title);
            if(existingBakeryByTitle){
                return res.status(400).json('Title already used');
            }
            const existingBakery_has_article = await bakery_has_articleDatamapper.getByTwoIds(data.bakery_id, data.article_id);

            if(existingBakery_has_article === undefined){
                await bakery_has_articleDatamapper.create({
                    bakery_id: data.bakery_id,
                    article_id: data.article_id
                });
                const bakery = await bakeryDatamapper.update({
                    title: data.title,
                    description: data.description,
                    img: data.img,
                    hourly: data.hourly,
                    city: data.city,
                    address: data.address,
                    zip_code: data.zip_code,
                    
                    id: numberId
                });
                return res.status(200).json(bakery);
            }

            await bakery_has_articleDatamapper.update({
                bakery_id: data.bakery_id,
                article_id: data.article_id,
                id: existingBakery_has_article.id
            })

            const bakery = await bakeryDatamapper.update({
                title: data.title,
                description: data.description,
                img: data.img,
                hourly: data.hourly,
                city: data.city,
                address: data.address,
                zip_code: data.zip_code,
                
                id: numberId
            });
            return res.status(200).json(bakery);
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

            const existingBakery = await bakeryDatamapper.getOne(numberId);
            if(!existingBakery){
                return res.status(404).json('Bakery not found');
            }

            await bakeryDatamapper.delete(numberId);
            return res.status(200).json('Bakery deleted');
        } catch (error) {
            return res.status(500).json({ error: '500 Internal Server Error' });
        }
    }
}