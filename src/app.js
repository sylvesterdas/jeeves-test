require('dotenv').config();

const { auth } = require('./middleware/auth');
const accountRouter = require('./account');
const topicRoutes = require('./topics');
const postRoutes = require('./posts');
const express = require('express');
const app = express();

app.use(express.json());
app.use((req, _, next) => {
    console.debug('Incoming', req.method, req.path);
    next();
})

app.get('/', (_, res) => res.send({ status: 'online' }))

app.use('/account', accountRouter);
app.use('/topics', auth, topicRoutes);
app.use('/posts', auth, postRoutes);

exports.start = async function start(PORT = process.env.PORT || 3000) {
    await require('./config/database').connect();
    app.listen(PORT, () => console.log('Listening on PORT', PORT));
}

exports.app = app;
