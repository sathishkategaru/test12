var path = require('path') //used for file path
var http = require("http")
var bodyParser = require("body-parser")
var uuid = require("node-uuid")
var dbconnect = require("./db.js")

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var app = new(require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.use(bodyParser.json())

app.post('/exams', function(req, res) {
    console.log("in server", req.body);
    var inp = req.body;
    var out = [];
    inp.tests.new.forEach(function(exam) {
        if (!exam.id) {
            exam.id = uuid();
            delete exam.status
        }
        out.push(exam);
    })
    inp.tests.old.forEach(function(exam) {
        delete exam.status
    })
    console.log("main input", inp)
    dbconnect.createRecords(inp.tests.new, function(newTests) {
        dbconnect.updateRecords(inp.tests.old, function(oldTests) {
            dbconnect.deleteRecords(inp.deletedTests, function() {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                var buf = JSON.stringify(out);
                res.write(buf);
                res.end();
            })
        })
    })
});

app.get('/exams', function(req, res) {
    dbconnect.getRecords(function(data) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        var buf = JSON.stringify(data);
        res.write(buf);
        res.end();
    }, function(err) {
        res.writeHead(500, {
            "Content-Type": "text/plain"
        });
        res.write(err);
        res.end();
    });

});

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
