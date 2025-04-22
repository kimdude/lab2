//Requiring packages
const { Client } = require("pg");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

//Connecting to server
const client = new Client ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect((error) => {
    if(error) {
        console.log("Fel vid anslutning: " + error);
    } else {
        console.log("Ansluten till databasen...");
    }
});

//Creating routes
app.get("/api", (req, res) => {
    res.json({message: "Welcome to this API."});
});

app.get("/api/employers", (req, res) => {
    res.json({message: "Get employers."});
});

app.post("/api/employers", (req, res) => {
    let employer =  req.body.employer;

    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    };

    if ( !employer ) {
        errors.message = "Employer not included.";
        errors.detail = "Include employer in JSON.";
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        res.status(400).json(errors);

        return;
    }
});

app.put("/api/employers/:id", (req, res) => {
    res.json({message: "Employer updated:" + req.params.id});
});

app.delete("/api/employers/:id", (req, res) => {
    res.json({message: "Employer deleted:" + req.params.id});
});

//Starting server
app.listen(process.env.PORT, () => {
    console.log('Connected to server on port:' + process.env.PORT);
});