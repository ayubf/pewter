import express from 'express';

const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    try {
        const allUsers = await pool.query(
            "SELECT * FROM users;",
            []
        );
        return res.send({"users": allUsers.rows})
    } catch {

    }
})

export default router;