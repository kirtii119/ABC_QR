const express = require('express');
const app = express();
const cors = require('cors');
const con = require("./connection.sql");
const path = require("path");
require("dotenv").config({ path: "./.env" });

//access port number from .env file
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));
const PORT = process.env.PORT || 5002;

//route to update a flag in an sql table named users
//in the route check if flag is already 1, if not, update it to 1

const getDetails = async (id) =>{

    queryResult = await new Promise((resolve, reject) => {
        con.query(
          `SELECT * FROM users WHERE regno = '${id}'`,
          function (err, result, fields) {
            if (err) {
              reject(err);
            } else resolve(result);
          }
        );
      }).catch((err) => {
        console.log(err);
        return -1;
      });
  
      if (queryResult == -1) {
          return -1;
      } else if(!queryResult[0]){
        return 0;
      }
      else {
         return queryResult[0]
      }
  
}

app.post('/api/getDetails', async (req, res) => {
    const { id } = req.body;
    console.log(req.body)
    if (!id) {
        return res.status(400).send({ mssg: "Insufficient/ Incorrect inputs" });
    }

    let details = await getDetails (id);
    console.log(details);

    if (details == -1) {
        return res.status(500).send({ mssg: "Internal Server Error" });
    } else if(details == 0){
        return res.status(404).send({mssg : "User Not Found"})
    }
    else {
        return res.status(200).send({ mssg: "Success", userData: details });
    }

});

app.put('/api/markAttnd', async (req, res) => {

  const { id } = req.body;
  console.log(req.body)
  if (!id) {
    return res.status(400).send({ mssg: "Insufficient/ Incorrect inputs" });
}

let details = await getDetails (id);

    if (details == -1) {
        return res.status(500).send({ mssg: "Internal Server Error" });
    } else if(details == 0){
        return res.status(404).send({mssg : "User Not Found"})
    }
    else if (details.flag == 1){
        return res.status(200).send({ mssg: "Already Admitted ", userData: details });
    }

queryResult2 = await new Promise((resolve, reject) => {
    con.query(
      `UPDATE users SET flag = 1 WHERE regno = '${id}'`,
      function (err, result, fields) {
        if (err) {
          reject(err);
        } else resolve(result);
      }
    );
  }).catch((err) => {
    console.log(err);
    return -1;
  });


    if (queryResult2 == -1) {
        return res.status(500).send({ mssg: "Internal Server Error" });
    } else {
        return res.status(200).send({ mssg: "Admitted", userData: details });
    }

});


app.get("/*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});


app.listen(process.env.PORT, () => console.log('Server running on PORT ', process.env.PORT));
module.exports = app;