Supersonic
----------

A small and supersonic flow-controll library for Node.js

### Install

	npm install Supersonic

### Usage

There are two modes, async and sync (or queued).

Async, all functions simultaneously.

``` js
var FlowAsync = require('Supersonic').Async;

new FlowAsync().push(function(ready){
	setTimeout(function(){
		ready();
	}, 1000);
})).push(function(ready){
	setTimeout(function(){
		ready();
	}, 2000);
}).invoke(function(){
	console.log('all ready, after 2 seconds');
});
```

All functions after each other.

``` js
var FlowQueue = require('Supersonic').Queue;

new FlowQueue().push(function(next){
	setTimeout(function(){
		ready();
	}, 1000);
})).push(function(ready){
	setTimeout(function(){
		ready();
	}, 2000);
}).invoke(function(){
    console.log('all ready, after 3 seconds');
});
```

That's it!
