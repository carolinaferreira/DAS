const before = require('aspectjs').before;
let addAdvice = require("aspectjs").addAdvice;

class SupremeLog {

	before(advised, methods){
 
		if(methods == null){
			methods = this.getInstanceMethodNames(advised)
			this.selectMethods(methods)
		}

		methods.forEach((method) => 
			before(advised, method).add(
				() => console.log("Entering method named " + advised.constructor.name + "." + method))
			)
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