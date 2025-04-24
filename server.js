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
        console.log("Failed to connect: " + error);
    } else {
        console.log("Connected to database...");
    }
});


//Creating routes
//Route for Read
app.get("/api/employers", (req, res) => {
    client.query(`SELECT * FROM workexperience;`, (err, results) => {
        if(err) {
            res.status(500).json({error: "An error occurred: " + err});
            return;
        }

        let rows = results.rows

        if(rows.length === 0) {
            res.json([]);
        } else {
            res.json(rows);
        }
    })
});

app.get("/api/employers/:id", (req, res) => {
    client.query(`SELECT * FROM workexperience WHERE id = $1;`, [req.params.id], (err, results) => {
        if(err) {
            res.status(500).json({error: "An error occurred: " + err});
            return;
        }

        let rows = results.rows

        if(rows.length === 0) {
            res.json([]);
        } else {
            res.json(rows);
        }
    })
});

//Route for Create
app.post("/api/employers", (req, res) => {
    let employer =  req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    //Object with errors
    let errors = {
        message: [],
        detail: "",
        https_response: {

        }
    };

    //Validating input
    if ( !employer ) {
        errors.message.push("Employer not included.");
    } 

    if( !jobtitle ) {
        errors.message.push("Jobtitle not included.");
    } 

    if( !location ) {
        errors.message.push("Location not included.");
    } 

    if( !startdate ) {
        errors.message.push("Startdate not included.");
    } 

    if( !enddate ) {
        errors.message.push("Enddate not included.");
    } 

    if( !description ) {
        errors.message.push("Description not included.");
    } 

    //Response to Create-request
    if ( errors.message.length > 0 ) {
        //Filling error-object
        errors.detail = "Include employer, jobtitle, location, startdate, enddate and description of employment in JSON.";
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        //Sending error-object
        res.status(400).json(errors);

    } else if( errors.message.length === 0 ) {
        //SQL-query to instert new workexperience
        client.query("INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate, description) VALUES ($1, $2, $3, $4, $5, $6)",
            [employer, jobtitle, location, startdate, enddate, description],
            (err, results) => {
                if(err) {
                    res.status(500).json({error: "An error accurred: " + err});

                } else {
                    console.log("Query created: " + results.rows);

                    //Object to confirm new experience in message
                    let experience = {
                        employer: employer,
                        title: title
                    }

                    res.json({message: "experience added: " + experience});

                }
            }
        )
    }
});


//Route for Update
app.put("/api/employers/:id", (req, res) => {
    let experienceID = req.params.id;
    let { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    client.query(`UPDATE workexperience 
        SET companyname = $1, jobtitle = $2, location = $3, startdate = $4, enddate = $5, description = $6
        WHERE id = $7;`, [companyname, jobtitle, location, startdate, enddate, description, experienceID], (err, result) => {
        if(err) {
            res.status(500).json({error: "An error occurred: " + err});
        } else if(result.rowCount === 0) {
            res.status(404).json({message: "Incorrect ID."});
        } else {
            res.json({message: "Employer updated: " + experienceID});
        }
    })
});


//Route for Delete
app.delete("/api/employers/:id", (req, res) => {
    let experienceID = req.params.id;

    //SQL-query to delete requested ID
    client.query(`DELETE FROM workexperience WHERE id=$1;`, [experienceID], (err, results) => {
        if(err) {
            res.status(404).json({error: "An error occurred " + err});

        } else {
            res.json({message: "Employer deleted: " + experienceID});

        }
    });
});


//Starting server
app.listen(process.env.PORT, () => {
    console.log('Connected to server on port:' + process.env.PORT);
});