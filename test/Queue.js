
var assert = require('assert');
var FlowQueue = require('../Queue');
var color = require('./util/colorLog').colorLog;

var flow = new FlowQueue;

var i = 0;
var k = 0;

var testObject1 = function(){};
var testObject2 = {a: 1};

flow.push(function(next, obj1, obj2){
	i++;

	assert.equal(obj1, testObject1, 'It should pass objects through next');
	assert.equal(obj2, testObject2, 'It should pass objects through next');
	
	setTimeout(function(){
		next(testObject1, testObject2);
	}, 200);
}).push(function(next, obj1, obj2){
	i++;

	assert.equal(obj1, testObject1, 'It should pass objects through next');
	assert.equal(obj2, testObject2, 'It should pass objects through next');

	flow.push(function(next){
		i++;
		k++;
		next();
	});
	flow.push(function(next){
		i++;
		k++;
		next();
	});
	next();
}).invoke(function(){
	i++;
}, testObject1, testObject2);

setTimeout(function(){
	assert.equal(2, k);
	assert.equal(5, i);
	color.green('✓    FlowQueue tests passed');
}, 300);
