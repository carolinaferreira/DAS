const SupremeLog = require('../lib/SupremeLog.js');

class Test {
	constructor(){
		SupremeLog.before(this);
		SupremeLog.after(this, ['trackenMethod2', 'trackenMethod4']);
		// SupremeLog.logFile = false
		this.trackenMethod();
		this.trackenMethod2();
		this.trackenMethod3();
		this.trackenMethod4();

	}

	trackenMethod(){
		console.log("I'm being watched 1");
	}

	trackenMethod2(){
		console.log("I'm being watched 2");
	}

	trackenMethod3(){
		console.log("I'm being watched 3");
	}

	trackenMethod4(){
		console.log("I'm being watched 4");
	}

	trackenMethodWithArgument(argument){

	}

}

test = new Test();
