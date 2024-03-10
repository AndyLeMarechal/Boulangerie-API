import client from "./pg.client.js";

export default {
    async getAll(){
        const query = {
            text: 'SELECT * FROM "get_user"'
        }
        const result = await client.query(query);
        return result.rows;
    },

    async getOne(id){
        const query = {
            text: 'SELECT * FROM "get_user" WHERE id = $1',
            values: [id]
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async getByEmail(email){
        const query = {
            text: 'SELECT * FROM "get_user" WHERE email = $1',
            values: [email]
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async getByUsername(username){
        const query = {
            text: 'SELECT * FROM "get_user" WHERE username = $1',
            values: [username]
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async create(data){
        const result = await client.query(
            'SELECT create_user($1)',
            [data]
        );
        return result.rows;
    },

    async update(data){
        const result = await client.query(
            'SELECT update_user($1)',
            [data]
        );
        return result.rows;
    },

    async delete(id){
        const query = {
            text: 'DELETE FROM "user" WHERE id = $1',
            values: [id]
        };
        const result = await client.query(query);
        return result.rows;
    }
}