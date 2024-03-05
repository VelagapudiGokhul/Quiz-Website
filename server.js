var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/quizDB');
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/save_quiz", (req, res) => {
    const quizID = generateUniqueID();
    var qname = req.body.qname;
    var qno = req.body.qno;
    var question = req.body.question;
    var option1 = req.body.option1;
    var option2 = req.body.option2;
    var option3 = req.body.option3;
    var option4 = req.body.option4;
    var crctoption = req.body.crctoption;

    var data = {
        "quizID": quizID,
        "qname": qname,
        "qno": qno,
        "question": question,
        "option1": option1,
        "option2": option2,
        "option3": option3,
        "option4": option4,
        "crctoption": crctoption
    };

    db.collection('quizzes').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");

        // Write data to JSON file
        fs.readFile('data.json', (err, jsonData) => {
            if (err) throw err;

            let quizData = JSON.parse(jsonData);
            quizData.push(data);

            fs.writeFile('data.json', JSON.stringify(quizData, null, 2), (err) => {
                if (err) throw err;
                console.log('Data written to JSON file');
            });
        });
    });

    setTimeout(() => {
        res.redirect(`/display.html?quizID=${encodeURIComponent(quizID)}`); // Redirect to home.html after 2 seconds (adjust as needed)
    }, 2000);
});

app.get("/", (req, res) => {
    res.set({
        "Allow-acces-Allow-Origin": '*'
    });
    return res.redirect('form.html');
}).listen(3000);

console.log("Listening on port 3000");

function generateUniqueID() {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}
