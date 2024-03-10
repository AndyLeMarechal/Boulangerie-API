import client from "./pg.client.js";

export default {
    async getAll(){
        const query = {
            text: 'SELECT * FROM "bakery_has_article"'
        }
        const result = await client.query(query);
        return result.rows;
    },

    async getOne(id){
        const query = {
            text: 'SELECT * FROM "bakery_has_article" WHERE id = $1',
            values: [id]
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async getByTwoIds(bakery_id, article_id){
        const query = {
            text: 'SELECT * FROM "bakery_has_article" WHERE bakery_id = $1 AND article_id = $2',
            values: [bakery_id, article_id]
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async create(data){
        const result = await client.query(
            'SELECT create_bakery_has_article($1)',
            [data]
        );
        return result.rows;
    },

    async update(data){
        const result = await client.query(
            'SELECT update_bakery_has_article($1)',
            [data]
        );
        return result.rows;
    },

    async delete(id){
        const query = {
            text: 'DELETE FROM "bakery_has_article" WHERE id = $1',
            values: [id]
        };
        const result = await client.query(query);
        return result.rows;
    }
}