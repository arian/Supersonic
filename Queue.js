
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
		var args = slice.call(arguments);
		var nextFn = function(){
			if (queue.length){
				var next = queue.shift();
				process.nextTick(function(){
					next.apply(flow, args);
				});
			} else process.nextTick(ready);
		};
		args.unshift(nextFn);
		nextFn();
		return this;
	};

};
