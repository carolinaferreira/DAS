var fs = require('fs');
const before = require('aspectjs').before;
const after = require('aspectjs').after;
let addAdvice = require("aspectjs").addAdvice;

class SupremeLog {

	constructor() {
		this.openFile();
		this._logFile = true;
		this._useTime = true;
	}

	get logFile() {
		return this._logFile;
	}

	set logFile(option) {
		this._logFile = option;
	}

	get useTime() {
		return this._useTime;
	}

	set useTime(option) {
		this._useTime = option;
	}

	before(advised, methods) {

		if(methods == null) methods = this._allMethods(advised)

		methods.map(method =>
			before(advised, method).add(
				() => this.writeLog("Entering method named " + advised.constructor.name + "." + method + "\n"))
			)
	}


	after(advised, methods) {

		if(methods == null) methods = this._allMethods(advised)

		methods.map(method =>
			after(advised, method).add(
				() => this.writeLog("Leaving method named " + advised.constructor.name + "." + method + "\n"))
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
		fs.open('supreme.log', 'w+', (err, fd) => {
		  if (err) throw err;
		});
	}

	writeLog(log) {
		let time = '[' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '] ';
		if(this._useTime) log = time + log

		log = "\n" + log

		if(this._logFile) {
			fs.appendFileSync('supreme.log', log, (err) => {
			  if (err) throw err;
			});
		}else{
			console.log(log);
		}
	}

}

module.exports = new SupremeLog();
