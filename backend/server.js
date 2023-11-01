const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()
app.use(cors())

const db = mysql.createConnection(
    {
        host: "sql12.freemysqlhosting.net",
        user: "sql12658352",
        password: "ARhXQFWN31",
        database: "sql12658352"
        


    }
)

app.post("/sql12658352", (req,res) => {
    const sql = "INSERT INTO Users (`name`, `username`, `email`, `password`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.password
    ]
})

app.listen(3306, () => {
    console.log("listening")
})