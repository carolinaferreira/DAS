const before = require('aspectjs').before;
let addAdvice = require("aspectjs").addAdvice;

class Adviser {
	printMsg(){
		console.log("Hello! I am a Before Adviser!");
	}

}

class SupremeLog {

	activate(advised, method){
		before(advised, method).add(new Adviser(), "printMsg");
	}

}

module.exports = new SupremeLog();