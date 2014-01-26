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

var testsVars = require('./tests-vars.js');

var clone = function (a){
	'use strict';
	return JSON.parse(JSON.stringify(a));
};

var generateParam = function (url,param,override){
	'use strict';
	var ret = {onlySet: false, variables:[]};
	var urls = override.urls || [];
	for (var i = 0; i < urls.length; i++) {
		var route = urls[i];
		var checkRoute = new RegExp(route.url);
		if (checkRoute.test(url)){
			var ar = Object.keys(route.params);
			for (var j = 0; j < ar.length; j++) {
				var attr = ar[j];
				if (param == attr){
					ret.onlySet = route.params[attr].onlySet;
					ret.variables = route.params[attr].variables;
				}
			}
		}
	}
	return ret;
};

var generateGetTests = function (url,paths,pos,ret,override){
	'use strict';
	var v = null;
	var paths_rec = null;
	var nb = paths.length;
	if (pos >= nb)
		return ret;
	if (paths[pos].indexOf(":") < 0){
		generateGetTests(url,paths,1+pos,ret,override || {});
		return ret;
	}
	var param = paths[pos];
	var params = testsVars.String(generateParam(url,param,override || {}));
	for (var i = 0; i < params.length; i++) {
		v = params[i];
		paths[pos] = v;
		if (pos == nb -1)
			ret.push(paths.join("/"));
		else{
			// recusrion 
			paths_rec = clone(paths);
			generateGetTests(url,paths_rec,pos+1,ret,override || {});
		}
	}
	return ret;
};

module.exports.generateGetUrls = function (urls,override, cb) {
	'use strict';
	var ret = [];
	for (var i = 0; i < urls.length; i++) {
		var url = urls[i].url;
		var paths = url.split("/");
		var tests = generateGetTests(url,paths,0,[url],override);
		ret.push({baseUrl:urls[i],tests:tests});
		console.log("Generate",url,tests.length);
	}
	cb(undefined, ret);
};





