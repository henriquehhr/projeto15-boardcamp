import dayjs from "dayjs";

import db from "../database/db.js";
//TODO fazer validação com JOI

export async function getRentals (req, res) {

    const {customerId, gameId} = req.query;
    //TODO usar o query strings
    try {
        const rentals = await db.query(
            `SELECT * FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id`
        );

        res.send(rentals.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function setRentals (req, res) {

    const {customerId, gameId, daysRented} = req.body;

    try {
        const rentDate = dayjs().format("YYYY-MM-DD"); 
        const gamePricePerDay = await db.query(`SELECT "pricePerDay" FROM games WHERE id=$1`, [gameId]);
        const originalPrice = gamePricePerDay * daysRented;
        await db.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, null, $5, null)`
        , [customerId, gameId, rentDate, daysRented, originalPrice]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function returnGame (req, res) {

    const {id} = req.query;

    try {
        
        const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id]);
        if(rental.rowCount === 0) {
            return res.sendStatus(404);
        }
        const returnDate = dayjs().format("YYYY-MM-DD");
        const delayFee = 5 ; 
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteRental (req, res) {

    const {id} = req.query;
    
    try {
        
    } catch (error) {
        res.status(500).send(error);
    }

}