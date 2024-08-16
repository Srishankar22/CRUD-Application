//Here we will write the nodejs code

//CORS (Cross-Origin Resource Sharing) is a mechanism that allows web servers to specify which domains are permitted to access their resources
//ex: frontend hosted in different server and backend in different server. Your frontend application needs to fetch some data from 
    //the backend API. Without CORS, the browser would block this request because it's considered a cross-origin request
    
//.listen() method is used to start the server and listen for incoming connections on a specified port and hostname


const express = require("express");
const cors = require("cors");   //Cross-Origin Resource Sharing
const mysql = require("mysql");

const app = express();
app.use(express.json());

app.use(cors());

// MySQL Connection Configuration
const db = mysql.createConnection({
    host: "localhost", // This is where your MySQL database is located. If you are running MySQL on your local machine, it's typically localhost. If your database is hosted elsewhere, you would use the IP address or domain name of that server.
    user: "root", //is is the username you use to log into your MySQL database. In many default installations, especially on local machines, the username might be root. However, in production environments, it's best practice to create a dedicated user with limited privileges.
    password: "", //This is the password associated with the user account specified above
    database: "crud" //This is the name of the MySQL database you want to connect to
})

app.get("/", (req,res)=>{
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data); 
    })
})  


// Route to create a new student
app.post("/create", (req, res) => {
    console.log("hi");
    const sql = "INSERT INTO student (Name, Email) VALUES (?, ?)";
    const values = [req.body.name, req.body.email];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.json("Error");
        }
        return res.json(data);
    });
});


app.put("/update/:id", (req, res) => {
    const sql = "UPDATE student SET Name = ?, Email = ? WHERE ID = ?";

    const values = [req.body.name, req.body.email];
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Error updating student' });
        }
        return res.json(data);
    });
});


app.delete("/student/:id", (req, res) => {
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, id, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});




// Start the server and listen on port 8081
app.listen(8083, () =>{
    console.log("listening...");
})


