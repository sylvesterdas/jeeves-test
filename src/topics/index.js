const { Router } = require("express");
const { Topic } = require("../model/topic");
const { Types: { ObjectId } } = require('mongoose')

const topicRoutes = new Router({ strict: true });

topicRoutes.get('/', async (req, res) => {
    try {
        let { skip = 0, limit = 20 } = req.query;

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

        const topics = await Topic.where().skip(skip).limit(limit).sort( '-createdAt' ).exec();

        return res.json(topics);
    } catch (err) {
        res.status(500);
        return res.send(err.message);
    }
})

topicRoutes.post('/', async (req, res) => {
    try {
        const { user } = req;
        const createdBy = ObjectId(user.user_id);

        const { name } = req.body;

        if (!name) {
            throw new Error('name is required');
        }

        const topic = await Topic.create({
            name, createdBy
        });

        return res.json(topic.toJSON());
    } catch (err) {
        res.status(500);
        return res.send(err.message);
    }
})

module.exports = topicRoutes;
