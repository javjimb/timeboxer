const app = require("./App");


app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});

app.listen(process.env.NODE_PORT, () => {
    console.log('App running on port ' + process.env.NODE_PORT);
});
