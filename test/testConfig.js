var jwt = require('jsonwebtoken');

var devid = 1;
var empid = 2;
var empposid = 5

var devjwt_token = jwt.sign({ id: devid }, 'lalala');
var empjwt_token = jwt.sign({ id: empid }, 'lalala');

module.exports = {

// find the id of the developer you want to test.
devid: 1,
devjwt_token: devjwt_token,
devqueryParams: '?jwt_token=' + devjwt_token + '&usertype=dev',

// find the id of the employer you want to test.
empid: 2,
empposid: 5,
empjwt_token: empjwt_token,
empqueryParams: '?jwt_token=' + empjwt_token + '&usertype=emp',
empqueryPos: '&posid='+empposid

};
