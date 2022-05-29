import db from "../database/db.js";

//TODO fazer validação do JOI
export async function getCustomers (req, res) {

    const {cpf} = req.query;
    try {
        let customers;
        if(cpf) {
            customers = await db.query(`SELECT * FROM customers WHERE cpf LIKE $1`, [`${cpf}%`]);
        } else {
            customers = await db.query(`SELECT * FROM customers`);
        }
        res.send(customers.rows);

    } catch (error) {
        res.status(500).send(error);
    }
    
}

export async function getCustomerById (req, res) {

    const {id} = req.params;
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        if(customer.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.send(customer.rows[0]);

    } catch (error) {
        res.status(500).send(error);
    }
    
}

export async function setCustomer (req, res) {

    const {name, phone, cpf, birthday} = req.body;

    try {
        const customerAlreadyRegistered = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);
        if(customerAlreadyRegistered.rowCount !== 0) {
            return res.sendStatus(409);
        }

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updateCustomer (req, res) {

    const {id} = req.params;
    const {name, phone, cpf, birthday} = req.body;

    try {
        const cpfAlreadyRegistered = await db.query(`SELECT * FROM customers WHERE cpf = $1 AND NOT id = $2`, [cpf, id]);
        if(cpfAlreadyRegistered.rowCount !== 0) {
            return res.sendStatus(409);
        }

        await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`, [name, phone, cpf, birthday, id]);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}