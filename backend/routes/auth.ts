// Add update user route here and its done

import express from 'express';


const router = express.Router();
const pool = require("../db")
const bcrypt = require("bcrypt");


router.post("/signup", async (req, res) => {
    try {
        const {firstName, lastName, userName, userPass} = req.body;
        await pool.query(
            'INSERT INTO users (firstName, lastName, userName, userPass) VALUES($1, $2, $3, $4)',
            [firstName, lastName, userName, await bcrypt.hash(userPass, 10)]
        );
        console.log("New User Created");
        return res.sendStatus(201);
    } catch {
        console.log("Failed to create new user");
        return res.sendStatus(400);
    }

})


router.post("/login", async (req, res) => {
    try {
        const {userName, userPass} = req.body;
        const userIfExists = await pool.query("SELECT * FROM users WHERE username = $1;", [userName])
        if (userIfExists.rows[0]) {
            if (await bcrypt.compare(userPass, userIfExists.rows[0].userpass)) {
                return res.send({"userName": userIfExists.rows[0], authed: true})
            }
        }

        return res.send({authed: false});
    
    } catch {

        console.log("Error in authenticating user");
        return res.sendStatus(400);

    }
})


router.delete('/deleteuser', async (req, res) => {
    try {
        const {Id} = req.body;
        await pool.query(
            'DELETE FROM users WHERE Id = $1',
            [Id]
        );
        console.log("User successfully deleted");
        return res.sendStatus(200);
    } catch {
        console.log("Failed to delete user");
        return res.sendStatus(400);
    }
})

export default router