import client from "./pg.client.js";

export default {
    async getAll(){
        const query = {
            text: 'SELECT * FROM "article"'
        }
        const result = await client.query(query);
        return result.rows;
    },

    async getAllWithBakeryId(){
        const query = {
            text: 'SELECT * FROM "get_article"'
        }
        const result = await client.query(query);
        return result.rows;
    },

    async getOneByBakeryId(id){
        const query = {
            text: 'SELECT * FROM "get_article" WHERE "bakery_id" = $1',
            values: [id]
        }
        const result = await client.query(query);
        return result.rows;
    },

    async getOne(id){
        const query = {
            text: 'SELECT * FROM "article" WHERE id = $1',
            values: [id]
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async getByType(type){
        const query = {
            text: 'SELECT * FROM "article" WHERE type = $1',
            values: [type]
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async getByTitle(title){
        const query = {
            text: 'SELECT * FROM "article" WHERE title = $1',
            values: [title]
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async create(data){
        const result = await client.query(
            'SELECT create_article($1)',
            [data]
        );
        return result.rows;
    },

    async update(data){
        const result = await client.query(
            'SELECT update_article($1)',
            [data]
        );
        return result.rows;
    },

    async delete(id){
        const query = {
            text: 'DELETE FROM "article" WHERE id = $1',
            values: [id]
        };
        const result = await client.query(query);
        return result.rows;
    }
}

















