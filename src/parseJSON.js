// this is what you would do if you were one to do things the easy way:
// var nextJSON = JSON.next;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  var i, // current index of JSON text
      char; // character at current index

  var decideParse = function () {
    if (char === '[') {
      return handleArray();
    } else if (char === '{') {
      return handleObject();
    } else if (char === '\"') {
      return handleString();
    } else if (char === 't' || char === 'f') {
      return handleBoolean();
    } else if (char === '-' || (char && char >= 0 && char <= 9)) {
      return handleNumber();
    } else if (char === 'n') {
      return handleNull();
    } else {
      return handleError('invalid character: ' + char);
    }
  };

  var handleNext = function() {
    i += 1; // increments index
    char = json.charAt(i);
    return char; // returns updated char
  };

  var handleArray = function() {
    var array = [];
    if (handleNext() === ']') {
      return array; // empty array
    } else {
      array.push(decideParse()); // parse char and add to array
    }
  };

  var handleObject = function() {
    var object = {};
    if (handleNext() === '}') {
      return object; // empty object
    } else {
      var key = handleString(); // get key
      object[key] = decideParse();
    }
  };

  var handleString = function() {
    var string = '';
    handleNext();
    // watch for end of string
    if(char === '\"') {
      handleNext();
      return string;
    }
    // watch for escapes
    if(char === '\\') {
      handleNext();
      string += char;
    // no escape or end found
    } else {
      string += char;
    } 
    handleNext();
  };

  var escapes = { // helper variable
    'b': '\b',
    'n': '\n',
    't': '\t',
    'r': '\r',
    'f': '\f',
    '\"': '\"',
    '\\': '\\'
  };

  var handleBoolean = function() {
    var bool = '';
    if(char === 't') {
      _.times(4, function() {
        bool += char;
        handleNext();
      });
      if(bool === 'true') {
        return true;
      } else {
        handleError('bad bool');
      }
    } else if(ch === 'f') {
      _.times(5, function() {
        bool += char;
        handleNext();
      });
      if(bool === 'false') {
        return false;
      } else {
        handleError('bad bool');
      }
    }
    handleError('bad bool');
  };

  var handleNumber = function() {
    // build a number string
    var number = ''; 
    // collect consecutive digits until non-digit is reached
    function getDigits() { 
      while(char <= 9) {
        number += char;
        handleNext();
      }
    }
    // parse decimal
    if(char === '.') {
      number += char;
      handleNext();
      getDigits();
    }
    // parse negative
    if(char === '-') {
      number += char;
      handleNext();
      getDigits();
    }
    // convert string to number
    return Number(number); 
  };

  var handleNull = function() {
    var nully = '';
      _(4).times(function() { // look up _.times()
        nully += char;
        handleNext();
      });
      if(nully === 'null') {
        return null;
      } else {
        handleError('bad null');
      }
    handleError('bad null');
  };

  var handleError = function(message) {
    console.log(message);
    //return undefined; //reference error
    throw undefined; // syntax error
  };

    i = 0;
    char = json.charAt(i);
    return decideParse();
};
