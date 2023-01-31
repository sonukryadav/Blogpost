require("dotenv").config({ path: "./.env.development" });
const axios = require('axios');
const { User } = require('../database/User');
const jwt = require('jsonwebtoken');
const config = require("../config/config");



const generateToken = (user) => {
    try {
        const { _id, name, email, image=" " } = user;
        console.log(user);
        console.log(process.env.JWT_SECRET_KEY);
        return (jwt.sign({ _id, name, email, image }, config.JWT_SECRET_KEY));
    } catch (err) {
        console.log(err);
    }
}


// new account registration
const register = async(req, res) => {
    try {
        // if user does not provide must fields
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return (res.status(404).send({error : 'Incomplete data'}));
        }
        // check if the user is already registered
        let user = await User.findOne({ email });
        if (user) {
            return (res.status(200).send({error : "User already registered"}));
        }
        // if user is not registered then add him/her to database
        user = await User.create({ name, email, signInMethod: 'email-password', password });
        return res.status(200).send({ message: "Registration successful" });
    } catch (err) {
            return (res.status(500).send({ error: "Something went wrong in registration" }));
    }
}


// Login
const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        // checking user in database
        let user = await User.findOne({ email });
        if (!user) {
            return (res.status(400).send({ error:"User not found -> Please register first" }));
        }
        if (user.password !== password) {
            return (res.status(400).send({ error: "Wrong password" }));
        }
        // create jwt token
        const token = generateToken(user);
        const { _id, name, image } = user;
        console.log("server "+email+" "+password)
        return (res.send({
            message: "Login successful",
            data: {
                token,
                user: {
                    _id, name, email, image
                }
            }
        }));
    } catch (err) {
        console.log(err);
        return (res.status(400).send({ error: "Something went wrong in login" }));
    }
}


// sign in with Github
const signInWithGithub = async(req, res) => {
    try {
        const code = req.params.code;
        // exchange the code with access token
        const url = `https://github.com/login/oauth/access_token`;
        let response = await axios.post(url, null, {
            params: {
                client_id: config.GITHUB_OAUTH_CLIENT_ID,
                client_id_secret: config.GITHUB_OAUTH_CLIENT_SECRET,
                code: code,
            },
            headers: {
                'Accept': 'application/json',
            }
        });
        console.log(response);
        let accessToken = response.data.access_token;
        if (!accessToken) {
            console.log(response.data);
            throw new Error('Something went wrong');
        }
        let url2 = 'https://api.github.com/user';
        response = await axios.get(url2, {
            headers: {
                'authorization': 'Bearer ${accessToken}',
            }
        });
        let user = response.data;
        let existingUser = await User.findOne({
            signInMethod: 'github-oauth',
            githubUsername: user.login
        });
        if (!existingUser) {
            // First time user is signing in with github
            existingUser = await User.create({
                name: user.name,
                email: user.email,
                image: user.avatar_url,
                signInMethod: 'github-oauth',
                githubUsername: user.login
            });
        }
        // Create JWT token
        const token = generateToken(existingUser);
        const { _id, name, image, email } = existingUser;
        return res.send({
            message: 'Login with github successful',
            data: {
                token,
                user: {
                    _id, name, email, image
                }
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            error: 'Something went wrong'
        });
    }
}

async function getLoggedInUser(req, res) {
    try {
        const user = req.user;
        return res.send({
            data: user
        });
    } catch (err) {
        return res.status(500).send({
            error: 'Something went wrong'
        });
    }
}

module.exports = {
    register,
    login,
    signInWithGithub,
    getLoggedInUser
}