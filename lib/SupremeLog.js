var fs = require('fs');
const before = require('aspectjs').before;
const after = require('aspectjs').after;
let addAdvice = require("aspectjs").addAdvice;

class SupremeLog {

	constructor() {
		this.openFile();
		this._logFile = true;
	}

	get logFile() {
		return this._logFile;
	}

	set logFile(option) {
		this._logFile = option;
	}

	before(advised, methods) {

		if(methods == null) methods = this._allMethods(advised)

		methods.map(method =>
			before(advised, method).add(
				() => this.writeLog("\nEntering method named " + advised.constructor.name + "." + method + "\n"))
			)
	}


	after(advised, methods) {

		if(methods == null) methods = this._allMethods(advised)

		methods.map(method =>
			after(advised, method).add(
				() => this.writeLog("\nLeaving method named " + advised.constructor.name + "." + method + "\n"))
			)
	}


	_allMethods(advised) {
		let methods = this.getInstanceMethodNames(advised)
		this.selectMethods(methods)
		return methods
	}

	selectMethods(methods) {
		let common_methods = ['__defineGetter__','__defineSetter__','hasOwnProperty','__lookupGetter__','__lookupSetter__','propertyIsEnumerable','toString','toLocaleString','valueOf','isPrototypeOf'];
		common_methods.forEach((item) => methods.splice(methods.indexOf(item), 1))
	}

	getInstanceMethodNames(obj) {
	  let array = [];
	  let proto = Object.getPrototypeOf (obj);
	  while (proto) {
	    Object.getOwnPropertyNames (proto)
	      .forEach (name => {
	        if (name !== 'constructor') {
	          if (this.hasMethod (proto, name)) {
	            array.push (name);
	          }
	        }
	      });
	    proto = Object.getPrototypeOf (proto);
	  }
	  return array;
	}

	hasMethod(obj, name) {
	  const desc = Object.getOwnPropertyDescriptor (obj, name);
	  return !!desc && typeof desc.value === 'function';
	}

	openFile() {
		fs.open('message.txt', 'w+', (err, fd) => {
		  if (err) throw err;
		});
	}

	writeLog(log) {
		if(this._logFile) {
			fs.appendFileSync('message.txt', log, (err) => {
			  if (err) throw err;
			});
		}else{
			console.log(log);
		}
	}

}

module.exports = new SupremeLog();
