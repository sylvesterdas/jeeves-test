const { Router } = require("express");
const { Types: { ObjectId } } = require('mongoose')
const { stringify } = require('JSONStream');
const { Comment } = require("../model/comments");

const commentRoutes = new Router({ strict: true });

commentRoutes.get('/', (req, res) => {
    try {
        const id = req.postId;

        Comment.find({ post: ObjectId(id) }).cursor()
            .pipe(stringify())
            .pipe(res.type('json'));
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

commentRoutes.post('/', async (req, res) => {
    try {
        const { user, body: { message } } = req;
        const id = req.postId;

        const comment = await Comment.create({
            createdBy: ObjectId(user.user_id),
            post: ObjectId(id),
            message
        });

        return res.json(comment.toJSON());
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = commentRoutes;
