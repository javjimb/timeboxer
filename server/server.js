const app = require("./App");
const https = require("https");
const fs = require("fs");

app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});

app.listen(process.env.NODE_PORT, () => {
    console.log('App running on port ' + process.env.NODE_PORT);
});

/*
const options = {
  key: fs.readFileSync(process.env.SSL_KEY),
  cert: fs.readFileSync(process.env.SSL_CERT)
}

https.createServer(options, app).listen(process.env.NODE_PORT, () => {
    console.log('App running on port ' + process.env.NODE_PORT);
});
 */
