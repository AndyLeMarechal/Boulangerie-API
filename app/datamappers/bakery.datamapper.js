import client from "./pg.client.js";

export default {
    async getAll(){
        const query = {
            text: 'SELECT * FROM "get_bakery"'
        }
        const result = await client.query(query);
        return result.rows;
    },

    async getOne(id){
        const query = {
            text: 'SELECT * FROM "bakery" WHERE id = $1',
            values: [id]
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async getByBakeryId(id){
        const query = {
            text: 'SELECT * FROM "get_bakery" WHERE id = $1',
            values: [id]
        };
        const result = await client.query(query);
        return result.rows;
    },

    async getByTitle(title){
        const query = {
            text: 'SELECT * FROM "get_bakery" WHERE title = $1',
            values: [title]
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async create(data){
        const result = await client.query(
            'SELECT create_bakery($1)',
            [data]
        );
        return result.rows;
    },

    async update(data){
        const result = await client.query(
            'SELECT update_bakery($1)',
            [data]
        );
        return result.rows;
    },

    async delete(id){
        const query = {
            text: 'DELETE FROM "bakery" WHERE id = $1',
            values: [id]
        };
        const result = await client.query(query);
        return result.rows;
    }
}