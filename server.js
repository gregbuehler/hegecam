var exec = require('child_process').exec;
var express = require('express')
var app = express()

var options = {
  root: __dirname + '/public/',
  headers: {
    'x-timestamp': Date.now()
  }
}

app.get('/', function (req, res) {
  res.sendFile('index.html', options, function(err){
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
  });
})

app.get('/cam.jpeg', function( req, res) {
  console.log("taking a picture!");
  streamer = "steamer -f jpeg -o " + __dirname + "/cam/cam.jpeg";

  exec(streamer, function (err, stdout, stderr) {
    if (err || stderr) {
      console.log(err, stderr);
      res.status(500).send("Problems accessing camera");
    }

    res.sendFile("cam.jpeg", options, function(err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    });
  });
})

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Hegecam listening on http://%s:%s', host, port)
})
