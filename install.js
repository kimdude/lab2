
const { Client } = require("pg");
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

//Creating table
client.query(`
    DROP TABLE IF EXISTS workexpirience;
    CREATE TABLE workexperience (
       id           SERIAL PRIMARY KEY,
       companyname  VARCHAR(30),
       jobtitle     VARCHAR(20),
       location     VARCHAR(20),
       startdate    TIMESTAMP,
       enddate      DATE,
       description  VARCHAR(60))
`);