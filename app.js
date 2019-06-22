"use strict";
// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

// configuration
const app = express();

app.use(bodyParser.json()); // tells the system that you want json to be used.
app.use(bodyParser.urlencoded({
    extended: true
})); // tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false)

app.post('/webhook', (req, res) => {
    console.log("webhook is triggered");//to check if the post function is working well on terminal

    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body.queryResult.action));

    //if(req.body.queryResult.action == "sheety-test") {
    //    console.log("true");
    //}

})

// Logic for running your server with HTTPS here
app.listen((process.env.PORT || 8000), () => {
    console.log("App is up and running...");
}); // set up
