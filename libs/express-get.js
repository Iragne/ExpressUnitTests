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

var async = require('async');
var request = require('request');
var assert = require("assert");
var generate = require('../libs/generate-tests.js');


var getRoutes = module.exports.getRoutes = function (app, cb) {
	'use strict';
	var router = app._router;
	cb(router ? undefined : "Router not found", router ? router.map : null,app.router);
	return router;
};



var getUrlGet = module.exports.getUrlGet = function (map, cb) {
	'use strict';
	var urls = [];
	for (var i = 0; map && i < map.get.length; i++) {
		var req = map.get[i];
		urls.push({url:req.path});
	}
	generate.generateGetUrls(urls,function (err, urls_tests){
		cb(undefined,urls_tests);
	});
};

var testGenerate = module.exports.testGenerate = function (app,port, cb) {
	'use strict';
	getRoutes(app, function (err,map,Router){
		getUrlGet(map,function (err,urls){
			async.map(urls,function (url,done_urls){
				describe('Tests for url: '+url.baseUrl.url, function(){
					async.map(url.tests,function (url_tests,done_test){
						it('Ckeck for url:'+url_tests,function (endTest){
							request.get("http://localhost:"+port+url_tests, function (e, r){
								if (e || r.statusCode == 500){
									done_test(r);
									throw "Error for "+url_tests;
								}else{
									endTest();
								}
							});
						});
					},function (err){
						done_urls();
					});
				});
			},function (err){
				cb();
			});
		});
	});
};