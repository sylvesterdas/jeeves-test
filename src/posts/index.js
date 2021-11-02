const { Router } = require("express");
const { Post } = require("../model/post");
const { Types: { ObjectId } } = require('mongoose')

const postRoutes = new Router({ strict: true });

postRoutes.get('/', async (req, res) => {
    try {
        let { skip = 0, limit = 20, topic_id } = req.query;

        if (skip < 0) {
            throw new Error('Skip should be a positive integer or 0');
        } else {
            skip = parseInt(skip);
        }

        if (limit < 1 || limit > 50) {
            throw new Error('limit should be a positive integer with max value as 50');
        } else {
            limit = parseInt(limit);
        }

        const posts = Post.where().skip(skip).limit(limit).sort('-createdAt');

        if (topic_id) {
            posts.where({ topic: ObjectId(topic_id) });
        }

        return res.json(await posts.exec());
    } catch (err) {
        res.status(500);
        return res.send(err.message);
    }
})

postRoutes.post('/', async (req, res) => {
    console.debug('Incoming Post creation', req.body);
    try {
        const { user } = req;
        const createdBy = ObjectId(user.user_id);
    
        const { title, body, topic } = req.body;
    
        if (!title || !topic) {
            throw new Error('title and topic are required');
        }

        const post = await Post.create({
            title, body, topic, createdBy
        });

        return res.json(post.toJSON());
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = postRoutes;
