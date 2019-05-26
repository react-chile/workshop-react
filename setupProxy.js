
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(proxy('/api', {target: 'http://localhost:4000/users'}));
	app.use(proxy('/api', {target: 'http://localhost:4000/clients'}));
	app.use(proxy('/api', {target: 'http://localhost:4000/services'}));
	app.use(proxy('/api', {target: 'http://localhost:4000/orders'}));
	
};
