"use strict";

const express = require("express");
const path=require("path")

const app = express();
const PORT = 3001;



const cors = require("cors")  //Allows 'Cross Origin Resource Sharing (requests from other domains)'
app.use(cors())

app.use(express.json());  //'modern way' - (replaces 'bodyParser')

let houses=[]

houses.push({id:"1", price:27500,area:"Handsworth",type:"Flat",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/108k/107051/78903606/107051_RS0730_IMG_11_0000_max_476x317.jpeg`})
houses.push({id:"2", price:1450000,area:"Harbourne",type:"House",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/93k/92029/104484854/92029_581009_IMG_00_0000_max_476x317.jpeg`})
houses.push({id:"3", price:165000,area:"Edgbaston",type:"Maisonette",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/73k/72455/97846952/72455_107VC_IMG_00_0000_max_476x317.jpg`})
houses.push({id:"4", price:210000,area:"Droitwich",type:"House",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/82k/81089/106335083/81089_DSS210050_IMG_00_0000_max_476x317.jpeg`})
houses.push({id:"5", price:300000,area:"Worcester",type:"House",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/23k/22403/106646495/22403_30630734_IMG_00_0000_max_476x317.jpeg`})
houses.push({id:"6", price:265000,area:"Worcester",type:"Flat",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/229k/228635/106602194/228635_816014_IMG_00_0000_max_476x317.jpeg`})


//app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '')));

app.get("/houses", (req, res) => {
  res.type('application/json')
  res.send(JSON.stringify( houses ));
});

app.post("/sms", (req, res) => {
  let msg = 
  `Hello! ${req.body.name} wants to book viewing for house ${req.body.id} on ${req.body.date} at ${req.body.time}. 
  Contact details: ${req.body.email} ${req.body.tel}.
  Notes: ${req.body.msg}` 
  sendSMS(msg, '07388620990') //agent number
  let cust_msg = `We have received your request for ${req.body.id} booking. We will come back to you shortly with the confirmation of booking.`
  sendSMS(cust_msg, req.body.tel)//customer number
  res.type('application/json')
  res.send(JSON.stringify( "OK" ));
});


app.listen(PORT, (message) => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// Prerequisite: install the request package e.g. npm install request

function sendSMS(msg,phoneNumber){
  const request = require('request');
const apiKey = 'sgU1EBOeN88gQEiZr10vFTuVugiJww'; 
const sendApiMessage = function(endpoint, messageArgs, callback) {
    return request.post(
        'https://www.firetext.co.uk/api/' + endpoint,
        { form: messageArgs },
        callback
    );
};

var endpoint = 'sendsms';
var urlArgs = {
    'apiKey' : apiKey,
    'to' : phoneNumber,
    'from' : 'Firetext',
    'message' : msg
};

sendApiMessage(endpoint, urlArgs, function(error, response, body){
    if (error) {
        return console.log(error);
    }
    console.log(body);
});
}