
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

		var nextFn = function(){
			if (queue.length){
				var next = queue.shift();
				var args = [nextFn].concat(slice.call(arguments));
				process.nextTick(function(){
					next.apply(flow, args);
				});
			} else process.nextTick(ready);
		};

		nextFn.apply(flow, slice.call(arguments, 1));
		return this;
	};

};
