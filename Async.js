
var slice = Array.prototype.slice;

module.exports = function(){

	var queue = [];

	this.push = function(fn){
		if (typeof fn != 'function'){
			throw new Error('the passed argument is not a function');
		}
		queue.push(fn);
		return this;
	};

	var flow = this;

	this.invoke = function(ready){
		if (!queue.length) throw new Error('The queue is empty');
		if (typeof ready != 'function'){
			throw new Error('the ready argument must be a function');
		}
		var todo = 0;
		var args = slice.call(arguments);
		var readyFn = function(){
			todo--;
			if (queue.length) runAll(); // new items queued
			else if (todo == 0) process.nextTick(ready);
		};
		args.unshift(readyFn);
		var runAll = function(){
			todo += queue.length;
			while (queue.length) (function(next){
				process.nextTick(function(){
					next.apply(flow, args);
				});
			})(queue.shift());
		};
		runAll();
		return this;
	};

};
