
// Local modules
var db = require('./db');

const CONTENT_TEXT = ['Content-Type', 'text/plain; charset=utf-8'];
const CONTENT_JSON = ['Content-Type', 'application/json; charset=utf-8'];

function handleOk (res) {
    return function (data) {
        res
            .status(200)
            .send(data);        
    }
}

function handleError (res, statusCode) {
    return function (err) {
        res.setHeader.apply(res, CONTENT_TEXT);
        res
            .status(statusCode || 500)
            .send((err instanceof Error) ? err.message : err);
    }
}

module.exports = function (app) {

    // app config

    app.all('/data/*', function (req, res, done) {
        res.setHeader.apply(res, CONTENT_JSON);
        done();
    });


    // app resources

    app.get('/', function (req, res) {
        res.redirect('/index.html');
    });

    app.get('/data/persons', function (req, res) {
        db.getPersons()
            .then(handleOk(res))
            .catch(handleError(res));
    });

    app.get('/data/persons/:id', function (req, res) {
        db.getPersons()
            .then(function (list) {
                var item = list[req.params.id];
                if (!!item) {
                    handleOk(res)(item);
                } else {
                    handleError(res, 404)('item not found');
                }
            })
            .catch(handleError(res));
    });

    app.put('/data/persons', function (req, res) {
        db.savePersons(req.body)
            .then(handleOk(res))
            .catch(handleError(res));
    });
}
