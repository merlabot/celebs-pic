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
    //if(req.body.queryResult.parameters.random) { // to make this function work only when menu-rec parameter is given


};
