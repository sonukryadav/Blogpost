const express = require('express');
const AuthRouter = require('./routes/auth');
const app = express();
const connectDatabase = require("./database/connectDatabase");
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.use("/api/auth", AuthRouter);

app.get('/', (req, res) => {
    res.send("server index.js default / route.");
});

app.use("/", express.static('static'));

connectDatabase().then(() => {
    try {
        app.listen(3030);
        console.log("server listening on 3030");
    } catch (err) {
        console.log(err);
    }
})