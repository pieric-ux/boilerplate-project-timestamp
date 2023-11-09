// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  let posixDate;
  let utcDate;
  
   if (date === undefined) {
      posixDate = Date.now();
      utcDate = new Date(posixDate).toUTCString();
      res.json({unix: posixDate, utc: utcDate});
    } else if (/\d{5,}/.test(date)) {
      posixDate = parseInt(date);
      utcDate = new Date(posixDate).toUTCString();
      res.json({unix: posixDate, utc: utcDate});
    } else if (!Date.parse(date)) {
      res.json({error: "Invalid Date"});
    } else {
      posixDate = Date.parse(date);
      utcDate = new Date(posixDate).toUTCString();
      res.json({unix: posixDate, utc: utcDate});
    }
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});