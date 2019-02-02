var express = require("express");
var path = require("path");

var tableData = require("./data/tabledata");
var waitingListData = require("./data/waitlistdata.js")

console.log(tableData);


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables Data
// =============================================================

//Waiting List Data
// =============================================================


app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "public/tables.html"));
})

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "public/reservations.html"));
})

app.get("/api/tables", function (req, res) {
    res.json(tableData);
})

app.get("/api/waitlist", function (req, res) {
    res.json(waitingListData);
})


app.post("/api/tables", function (req, res) {
    var newreservation = req.body;
    console.log(newreservation);
    if (tableData.length < 5) {
        tableData.push(newreservation);
        res.json(newreservation);
    } else {
        waitingListData.push(newreservation);
        res.json(newreservation);
    }
    
    console.log("table length: " + tableData.length)
})




// Listening to port confirmation
// =============================================================

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
