// Isnt this pretty much done as well?
// Small update likes route left pretty much

import express from 'express'

const router = express.Router();
const pool = require("../db");

router.post("/createpost", async (req, res) => {
    try {
        const {userId, postTitle, postContent} = req.body;
        await pool.query(
            "INSERT INTO posts (userId, postTitle, postContent, posturl) VALUES($1, $2, $3, $4);",
            [userId, postTitle, postContent, postTitle.replace(/\s/g, "-").toLowerCase()]
        )
        console.log("New post succesfully created");
        return res.sendStatus(201);
    } catch {
        console.log("Failed to create new post");
        return res.sendStatus(400);
    }
})

router.get("/", async (req, res) => {
    try {
        const {postId} = req.body;
        if (postId!= "") {
            await pool.query(
                'UPDATE posts SET views = views+1 WHERE id = $1',
                [postId]
            )
            return res.send(await pool.query(
                'SELECT * FROM posts WHERE Id = $1',
                [postId]
            ))
        } else {
            return res.send(await pool.query(
                "SELECT * FROM posts",
                []
            ))
        }
    } catch {
        console.log("Failed to locate post");
        return res.sendStatus(400);
    }
})

router.delete("/deletpost", async (req, res) => {
    try {
        const {postId} = req.body;
        return res.send(await pool.query(
            "DELETE FROM tasks WHERE id = $1",
            [postId]
        ))
    } catch {
        console.log("Failed to delete post");
        return res.sendStatus(400);
    }
})

export default router;