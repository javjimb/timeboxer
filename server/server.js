const app = require("./App");


app.use(function(req, res, next) {
    console.log(req.method);
    console.log(req.originalUrl);
    res.status(404);
    res.send('404: File Not Found');
});

app.listen(process.env.NODE_PORT, () => {
    console.log('App running on port ' + process.env.NODE_PORT);
});
