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

module.exports.Number = function (tests_vars) {
	'use strict';
	var ret = [0,1,2,3,4,5,6,7,8,9,10,42,11.1234,Math.random(),Math.random(),Math.random()*1000,8526*Math.random(),-1,-2,-1*Math.random(),-1*Math.random()*456];
	for (var i = 0; tests_vars && i < tests_vars.Number.length; i++) {
		ret.push(tests_vars.Number[i]);
	}
	return ret;
};

module.exports.String = function (tests_vars) {
	'use strict';
	var ret = ["","32524647^p^m`m","('§ç!à('ç!§(!èçè'(çè'","a","<=>",""];
	for (var i = 0; tests_vars && i < tests_vars.String.length; i++) {
		ret.push(tests_vars.String[i]);
	}
	return ret;
};
module.exports.Array = function (tests_vars) {
	'use strict';
	// TODO ?
};

