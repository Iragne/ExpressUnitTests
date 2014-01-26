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

// var ret = {onlySet: false, variables:[]};
// module.exports.Number = function (tests_vars) {
// 	'use strict';
// 	var ret = [0,1,42,Math.random()*1000,-1*Math.random()*456];
// 	for (var i = 0; tests_vars && i < tests_vars.Number.length; i++) {
// 		ret.push(tests_vars.Number[i]);
// 	}
// 	return ret;
// };

var clone = function (a){
	'use strict';
	return JSON.parse(JSON.stringify(a));
};

module.exports.String = function (vars) {
	'use strict';
	var ret = ["('§ç!à('ç!§(!èçè'(çè'","a","<=>",0,1,42,Math.random()*1000,-1*Math.random()*456];
	var tests_vars = vars.variables || [];
	ret = vars.onlySet ? tests_vars : ret;
	ret = clone(ret);
	for (var i = 0; tests_vars && i < tests_vars.length; i++) {
		ret.push(tests_vars[i]);
	}
	return ret;
};
// module.exports.Array = function (tests_vars) {
// 	'use strict';
// 	// TODO ?
// };

