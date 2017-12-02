const before = require('aspectjs').before;
let addAdvice = require("aspectjs").addAdvice;

class SupremeLog {

	activate(advised, method){
		before(advised, method).add(this, "printMsg");
	}

	printMsg(){
		console.log("I'M WATCHING YOU");
	}

}

module.exports = new SupremeLog();