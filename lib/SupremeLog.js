const before = require('aspectjs').before;
const after = require('aspectjs').after;
let addAdvice = require("aspectjs").addAdvice;

class SupremeLog {

	before(advised, methods){
 
		if(methods == null){
			methods = this.allMethods(advised)
		}

		methods.forEach((method) => 
			before(advised, method).add(
				() => console.log("Entering method named " + advised.constructor.name + "." + method))
			)
	}

	after(advised, methods){
 
		if(methods == null){
			methods = this.allMethods(advised)
		}

		methods.forEach((method) => 
			after(advised, method).add(
				() => console.log("Leaving method named " + advised.constructor.name + "." + method))
			)
	}


	allMethods(advised){
		let methods = this.getInstanceMethodNames(advised)
		this.selectMethods(methods)
		return methods
	}

	selectMethods(methods){
		let common_methods = ['__defineGetter__','__defineSetter__','hasOwnProperty','__lookupGetter__','__lookupSetter__','propertyIsEnumerable','toString','toLocaleString','valueOf','isPrototypeOf'];
		common_methods.forEach((item) => methods.splice(methods.indexOf(item), 1))
	}

	getInstanceMethodNames (obj) {
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

	hasMethod (obj, name) {
	  const desc = Object.getOwnPropertyDescriptor (obj, name);
	  return !!desc && typeof desc.value === 'function';
	}


}

module.exports = new SupremeLog();