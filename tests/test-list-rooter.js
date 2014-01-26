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

var request = require('request');
var assert = require("assert");
var should = require('should');
var express_get = require('../libs/express-get.js');
var generate = require('../libs/generate-tests.js');


var server = require('./libs/server.js');
var options = {port:3300};
var app = server.createServer(3300);



var special_tests = {
	variables:[],
	urls:[
		{
			url:"^.*",
			params:{
				":lang":{
					variables:["en_EN"],
					onlySet:false,
				},
				":client_key":{
					variables:["coucoukey"],
					onlySet:false,
				}
			},
			method:{
				post:{
					params:{
						login:{
							variables:[""],
							onlySet:true,
						},
						password:{
							variables:[""],
							onlySet:true,
						}
					}
				}
			}
		},
		{
			url:"^/api.*",
			params:{
				":method":{
					variables:["toto"],
					onlySet:true,

				}
			}
		}
	]
};
options.override = special_tests;

describe('Express Test Rooter ', function(){
	describe('Get method', function(){
		it('check method generateGetUrls', function (done){
			generate.generateGetUrls([{url:""}],{}, function (err,map,Router){
				done();
			});
		});
		it('check method get Route', function (done){
			express_get.getRoutes({}, function (err,map,Router){
				done();
			});
		});
		it('check method /hello.txt', function (done){
			express_get.getRoutes(app, function (err,map,Router){
				should(map).have.property('get');
				should(map.get).containDeep([{path:'/hello.txt'}]);
				done();
			});
		});
		it('check method /api/:method', function (done){
			express_get.getRoutes(app, function (err,map,Router){
				should(map).have.property('get');
				should(map.get).containDeep([{path:'/api/:method'}]);
				done();
			});
		});
		it('check generate get', function (done){
			express_get.getRoutes(app, function (err,map,Router){
				express_get.getUrlGet(map, options, function (err,urls){
					done();
				});
			});
		});
		describe('check test url', function (){
			express_get.testGenerate(app, options, function(){});
		});
		
	});
});
