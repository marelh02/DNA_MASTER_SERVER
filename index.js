const { readServersFromFile, getLocalIpAddress } = require('./utilities');
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');


app.use(cors(), bodyParser.json());

// Destination folder for uploaded files
const upload = multer({
    dest: 'uploads/' 
  });

const PORT = 3000;
const NAME = "DNA_MASTER"
const IP = getLocalIpAddress()


const { runningServers, failingServers } = readServersFromFile("grid.json");


app.get('/grid-status', (req, res) => {

    const masterServer = {
        name: NAME,
        ip: IP,
        port: PORT,
        running: true
    };


    res.status(200).json([masterServer, ...runningServers, ...failingServers]);
});

app.post('/find-pattern',upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    const seq = req.body.seq;
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const result = [data, seq];
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading file');
    }
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("🧬  "+NAME + " is listening on port " + PORT+"  🧬")
    else
        console.log("Error occurred, server can't start", error);
}
);
