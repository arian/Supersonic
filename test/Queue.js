
var assert = require('assert');
var FlowQueue = require('../Async');
var color = require('./util/colorLog').colorLog;

var flow = new FlowQueue;

var i = 0;
var k = 0;

flow.push(function(next){
	i++;
	setTimeout(function(){
		next();
	}, 200);
}).push(function(next){
	i++;
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
});

setTimeout(function(){
	assert.equal(2, k);
	assert.equal(5, i);
	color.green('✓    FlowQueue tests passed');
}, 300);
