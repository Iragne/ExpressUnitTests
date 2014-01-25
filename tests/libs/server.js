//
// Copyright (c) 2013 Jean Alexandre Iragne (https://github.com/Iragne)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

var express = require('express');
var app = express();


module.exports.createServer = function(port){
	'use strict';
	//app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(logErrors);
	app.use(clientErrorHandler);
	app.use(errorHandler);
	function logErrors(err, req, res, next) {
		//console.error(err.stack);
		next(err);
	}
	app.get('/toto', function(req, res){
		//req.params.toto.ss == 3;
		res.end('/');
	});
	function clientErrorHandler(err, req, res, next) {
		if (req.xhr) {
			res.send(500, { error: 'Something blew up!' });
		} else {
			next(err);
		}
	}
	function errorHandler(err, req, res, next) {
		res.status(500);
		res.render('error', { error: err });
	}
	app.get('/hello.txt', function(req, res){
		res.end('hello.txt');
	});
	app.get('/api/:method', function(req, res){
		res.end('/api/:method');
	});
	app.get('/api/:method/:id', function(req, res){
		res.end('/api/:method');
	});
	app.get('/', function(req, res){
		res.end('/api/:method');
	});
	
	app.listen(port);
	return app;
};

