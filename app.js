const express = require('express');
const app = express();
const connectDB = require('./database/connect.js');
const User = require('./models/User.js');
require('dotenv').config();

app.use(express.json());
app.use(express.static('./public'));

app.get('/user', async(req, res) => {
    const user = await User.find();
    return res.status(200).json({status: true, code: 1, msg: 'Got all Users', data: user});
});

app.post('/user', async(req, res) => {
    const {username, password} = req.body;
    const user = await User.create({username: username, password: password});
    return res.status(200).json({status: true, code: 1, msg: 'Successfully created User', data: []});
});

app.get('/user/:id', async(req, res) => {
    const {id} = req.params;
    if (id) {
        const user = await User.findOne({_id: id});
        return res.status(200).json({status: true, code: 1, msg: 'Success', data: user});
    }
    return res.status(400).json({status: true, code: 0, msg: 'Failed', data: []});
});

app.patch('/user/:id', async(req, res) => {
    const {id} = req.params;
    const {points} = req.body;
    const user = await User.findOne({_id: id});
    user.points += points;
    await user.save();
    return res.status(200).json({status: true, code: 1, msg: 'Successfully updated user', data: user});
});

app.patch('/user/achievement/:id', async(req, res) => {
    const {id} = req.params;
    const {achievement} = req.body;
    const user = await User.findOne({_id: id});
    user.achievements.push(achievement);
    await user.save();
    return res.status(200).json({status: true, code: 1, msg: 'Successfully updated user achievement', data: user});
});

app.get('/user/achievement/:id', async(req, res) => {
    const {id} = req.params;
    const user = await User.findOne({_id: id});
    return res.status(200).json({status: true, code: 1, msg: 'Got user achievements', data: user.achievements});
});

const port = process.env.PORT || 3000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
    catch(error) {
        console.log(error);
    }
}

start();