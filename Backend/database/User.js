const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    genders: String,
    image: String,
    githubUserName: String,
    signInMethod: String,
}, {
    timestamps : true,
});

const User = mongoose.model("User", UserSchema);


module.exports = { User };