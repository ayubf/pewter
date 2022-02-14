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
        const allPosts = await pool.query(
            "SELECT * FROM posts;",
            []
        );
        return res.send({"posts": allPosts.rows})
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

router.get("/:postTitle", async (req, res) => {
    try {
        const specificPost = await pool.query(
            "SELECT * FROM posts WHERE posturl = $1",
            [req.params.postTitle]
        );

    
        if (specificPost.rows == false) {
            console.log("Post not found");
            return res.sendStatus(404);
        } else {

            await pool.query(
                "UPDATE posts SET views = views+1 WHERE posturl = $1",
                [req.params.postTitle]
            )

            return res.send({
                "post": specificPost.rows[0],
            });
        }

    } catch {   
        console.log("Post not found");
        return res.sendStatus(404);
    }
})

export default router;