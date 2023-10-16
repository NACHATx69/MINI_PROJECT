var express = require('express');
var router = express.Router();

const HandyStorage = require('handy-storage');
const storage = new HandyStorage({
    beautify: true,
});

storage.connect('../information.json');

console.log('storage '+JSON.stringify(storage.state));


module.exports = router;
