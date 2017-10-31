// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var jsonObj = ''
  if (typeof obj === 'number') {
    //jsonObj += parseInt(obj);
    jsonObj += obj.toString();
  } else if (typeof obj === 'string') {
    jsonObj += "\"" + obj + "\"";
  } else if (typeof obj === 'boolean') {
    jsonObj += obj.toString();
  } else if (Array.isArray(obj) === true) {
  	if (obj.length === 0) {
      return '[]';
  	}
  	jsonObj += '['
    obj.forEach(function(element, index) {
      if (index === obj.length - 1) {
        jsonObj += stringifyJSON(element);
      } else {
      	jsonObj += stringifyJSON(element) + ',';
      }
    });
    jsonObj += ']'
  } else if (typeof obj === 'object') {
  	if (Object.values(obj).length === 0) {
      return '{}';
  	}
  	jsonObj += '{';
    for (var key in obj) {
      if (typeof obj[key] === 'undefined' || typeof obj[key] === 'function') { //should skip functions and undefined keys
        //skip
      } else {
      if (obj[key] === null) {
      	jsonObj += stringifyJSON(key);
        jsonObj += ':';
        jsonObj += 'null';
      } else {
      	if (stringifyJSON(key) === stringifyJSON(Object.keys(obj)[Object.keys(obj).length-1])) { //check if key is last in object
          jsonObj += stringifyJSON(key);
          jsonObj += ':';
          jsonObj += stringifyJSON(obj[key]);
      	} else {
          jsonObj += stringifyJSON(key);
          jsonObj += ':';
          jsonObj += stringifyJSON(obj[key]) + ',';
      	}
      }
      }

    }
    jsonObj += '}';
  } else {
  	jsonObj += null;
  }
  return jsonObj;
};
