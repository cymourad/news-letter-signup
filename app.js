//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.listen(3000, function() {
  console.log('Server listening to port 3000 ...');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/signup', function(req, res) {
  const data = req.body;
  const firstName = data.firstName;
  const lastName = data.lastName;
  const email = data.email;

  var userData = {
    members: [{
      email_adress: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsonUserData = JSON.stringify(userData);

  var options = {
    url: 'https://us18.api.mailchimp.com/3.0/lists/',
    method: 'POST',
    headers: {
      "Authorization": "anegla1 b4b603b2e04fac087bc5c0acd0baed44-us18"
    },
    body: jsonUserData
  };

  request(options, function(error, response, body) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }
  });
});

// API key
// bb8cc9ae7805d7e262a9638fca9f3ae7-us3
// b4b603b2e04fac087bc5c0acd0baed44-us18

// List
// 7b80f67abe