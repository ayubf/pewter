// Authentication go routes here but for now, dummy routes

import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    console.log("Ping!");
    return res.send({
        response: "Works"
    });
})

export default router