import db from "../database/db.js";

export async function getCategories (req, res) {

    try {
        const categories = await db.query("SELECT * FROM categories;");
        res.send(categories.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function setCategories (req, res) {

    //TODO terminar validação com JOI

    const {name} = req.body;

    try {
        const categories = await db.query(`SELECT * FROM categories WHERE name=$1;`, [name]);
        if(categories.rows.length !== 0) {
            return res.sendStatus(409);
        }
        await db.query(`INSERT INTO categories (name) values ($1)`, [name]);
        res.sendStatus(201);    

    } catch (error) {
        res.status(500).send(error);
    }
}