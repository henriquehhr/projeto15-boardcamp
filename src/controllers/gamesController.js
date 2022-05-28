import db from "../database/db.js";

//TODO fazer validação do JOI
export async function getGames(req, res) {

    const {name} = req.query;
    
    try {
        let games;
        if(name) {
            games = await db.query(
                `SELECT games.*, categories.name as "categoryName" FROM games
                JOIN categories
                ON games."categoryId" = categories.id
                WHERE games.name ILIKE $1`, [`${name}%`]);
        } else {
            games = await db.query(
                `SELECT games.*, categories.name as "categoryName" FROM games
                JOIN categories
                ON games."categoryId" = categories.id`);
        }
        
        res.send(games.rows);

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function setGames(req, res) {

    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;

    try {
        
        const category = await db.query(`SELECT * FROM categories WHERE id=$1`, [categoryId]);
        if(category.rowCount === 0) {
            return res.sendStatus(400);
        }
        const gameAlreadyRegistered = await db.query(`SELECT * FROM games WHERE name=$1`, [name]);
        if(gameAlreadyRegistered.rowCount !== 0) {
            return res.sendStatus(409);
        }
        console.log("tentando inserir");
        await db.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`, [name, image, stockTotal, categoryId, pricePerDay]);
        console.log("inserido");
        res.sendStatus(201);

    } catch (error) {
        res.status(500).error;
    }

}