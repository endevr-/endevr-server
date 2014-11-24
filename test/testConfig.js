var jwt = require('jsonwebtoken');

var devid = 1;
var empid = 1;
var empposid = 1;

var devjwt_token = jwt.sign({ id: devid }, 'lalala');
var empjwt_token = jwt.sign({ id: empid }, 'lalala');

module.exports = {

	// find the id of the developer you want to test.
	devid: devid,
	devjwt_token: devjwt_token,
	devqueryParams: '?jwt_token=' + devjwt_token + '&usertype=dev',

	// find the id of the employer you want to test.
	empid: empid,
	empposid: empposid,
	empjwt_token: empjwt_token,
	empqueryParams: '?jwt_token=' + empjwt_token + '&usertype=emp',
	empqueryPos: '&posid='+empposid

};
