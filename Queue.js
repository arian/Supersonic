
var slice = Array.prototype.slice;

module.exports = function(options){

	if (options == null) options = {};
	var tick = options.tick;
	if (tick == false) tick = function(fn){ fn() };
	if (!tick) tick = process.nextTick;

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

		var nextFn = function(){
			var length = queue.length;
			var fn = length ? queue.shift() : ready;
			var args = slice.call(arguments);
			if (length) args = [nextFn, finish].concat(args);
			tick(function(){
				fn.apply(flow, args);
			});
		};

		var finish = function(){
			queue.length = 0;
			nextFn.apply(this, arguments);
		};

		nextFn.apply(flow, slice.call(arguments, 1));
		return this;
	};

};
