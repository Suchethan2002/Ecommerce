const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());

const mongouri = "mongodb+srv://20211a05c2:vishu123@cluster0.kb860pu.mongodb.net/";

mongoose.connect(mongouri)
    .then(() => {
        console.log("db connected");
        
       
        require('./dummyschema');
        const User=mongoose.model('UserInfo');
        const newUser = new User({
            username: "Vishu",
            email: "Vishu@gmail.com",
            password: "dghain",
            leetcode_username: 'wgrwgw',
            hackerrank_username: 'sfgaqsrgrw',
            geeksforgeeks_username: 'jksfkwj'
        });

        newUser.save()
            .then(() => {
                console.log('User saved successfully');
            })
            .catch((err) => {
                console.error('Error saving user:', err);
            });
        User.findOne({ email: 'Body of post.' })
            .then(user => {
                console.log('Found user:', user);
            })
            .catch(err => {
                console.error('Error finding user:', err);
            });
    })
    .catch((e) => console.log(e));
