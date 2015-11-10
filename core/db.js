// System modules
var fs = require('fs');

//------------------------------------------------------------------------------

const DATAFILE = __dirname + '/data.json';

/* 
    returns Promise instance
*/
function getPersons () {
    return new Promise(function (resolve, reject) {
        fs.readFile(DATAFILE, 'utf8', function (err, data) {
            if (err) return reject(err);
            try {
                var list = JSON.parse(data);
            } catch (e) {
                reject(e);
            }
            resolve(list);
        });
    })
}
module.exports.getPersons = getPersons;

/*
    @param list -- associated list of persons
    returns Promise instance
*/
function savePersons (list) {
    return new Promise(function (resolve, reject) {
        var data = JSON.stringify(list);
        fs.writeFile(DATAFILE, data, function (err) {
            if (err) return reject(err);
            resolve();
        });
    });
}
module.exports.savePersons = savePersons
