<!--

// Copyright 2004 by Edmund K. Lai

// to do: deleting item containing something already deleted
// io do: deleion of mixed content

// TBD : when make new element, take account of global/local

document.onkeydown = keyhit;
xmlSelection = null;
focusField = null;

isIE = false;
isMoz = false;
isOpera = false;
isSafari = false;
isKonqueror = false;
if (navigator.userAgent.indexOf('Opera') != -1 ) {
   isOpera = true;
} else if (navigator.userAgent.indexOf('Safari') != -1 ) {
   isSafari = true;
} else if (navigator.userAgent.indexOf('Konqueror') != -1 ) {
   isKonqueror = true;
} else if (navigator.userAgent.indexOf('Opera') != -1 ) {
   isOpera = true;
} else if (navigator.appName.indexOf('Microsoft') != -1) {
	isIE = true;
} else if (navigator.appName.indexOf('Netscape') != -1) {
	isMoz = true;
}

// function determine the type of node

  XMLanonymous = 1;
  XMLattribute = 2;
  XMLsimpleType = 3;
  XMLsimpleContent = 4;
  XMLcomplexContent = 5;
  XMLmixedContent = 6;
  
  function xmlType(frag) {
    // TBD : use index
    switch (frag.className) {
      case 'XMLattribute':
        return XMLattribute;
      case 'XMLsimpleContent':
        return XMLsimpleContent;
      case 'XMLcomplexContent':
        return XMLcomplexContent;
      case 'XMLmixedContent':
        return XMLmixedContent;
      case 'XMLsimpleType':
        var span = frag.getElementsByTagName('span');
        if (span[0] && span[0].className == 'XMLanonymous') return XMLanonymous;
        return XMLsimpleType;
      default:
        return 0;
    }
  }
  
  function isSimpleWithAttribute(frag) {
    return (xmlType(frag) == XMLsimpleType && xmlType(frag.parentNode) == XMLsimpleContent);
  }
  
  function isDeleted(frag) {
    while (frag && frag.nodeName != 'FORM') {
      frag = frag.parentNode;
      if (frag.nodeName == 'DEL') return true;
    }
    return false;
  }
    
  function isRoot(frag) {
    return (frag.parentNode.tagName == 'FORM');
  }
  
  function getRoot() {
    return getChildByTagNames(document.xmlForm, ['DIV']);
  }
  
  function rejectRoot(item) {
    if (isRoot(item)) {
      alert('You cannot do this to the root element');
      return true;
    }
    return false;
  }
	
  // TBD : convert to method so we can have inheritance
  
  function notValid_anySimpleType(strObj) {
	return false;
  }
  
  function notValid_anyType(strObj) {
	return false;
  }
  
  function canonicalized(strObj) {
  	strObj.length = strObj.value.length;
	strObj.canonicalized = true;
    return true;
  }
  
  function notValid_hexBinary(strObj) {
    strObj.value = strObj.value.replace(/\s/g, '').toUpperCase();
    canonicalized(strObj);
    var bool = (strObj.value.search(/^([0-9A-F]{2})*$/) != 0);
	strObj.length = strObj.length / 2;
	return bool;
  }
  
  function canonical_hexBinary(strObj) {
    notValid_hexBinary(strObj);
	return true;
  }
  
  function notValid_base64Binary(strObj) {
    strObj.value = strObj.value.replace(/\s/g, '');
    canonicalized(strObj);
    var bool = (strObj.value.search(/^(([0-9a-zA-Z\/+]{4})*)*([0-9a-zA-Z\/+]{3}=|[0-9a-zA-Z\/+]{2}==)?$/) != 0);
	strObj.length = strObj.length * 3 / 4; // TBD we need to find the actual number of bytes
	return bool;
  }
  
  function canonical_base64Binary(strObj) {
    notValid_base64Binary(strObj);
	return true;
  }
  
  function notValid_decimal(strObj) {
    return (strObj.value.search(/^\s*[+-]?(\d+\.?\d*|\.\d+)\s*$/) != 0);
  }
  
  function canonical_decimal(strObj) {
    var rst = strObj.value.replace(/^\s*([+-]?)0*/, "$1"); // remove leading space and 0
	rst = rst.replace(/^([+-]?)\./, "$1" + "0."); // make sure a digit before decmial pt
	rst = rst.replace(/\s+$/, ''); // trim it
	if (rst.indexOf('.')) { // has decimal pt
	  rst = rst.replace(/0*$/, ''); // remove trailing 0
	  if (rst.charAt(rst.length-1) == '.') rst += '0';
	} else {
	  rst += '.0';
	}
	if (rst[rst.length-1] == '.') rst = rst.substr(0,rst.length-1);
	if (rst == '+' || rst == '-' || rst == '') { 
	  rst = '0.0';
	} else if (rst[0] == '+') {
	  rst = rst.substr(1);
	}
	var totalDigits = rst.length - 1;
	var fractionDigits = totalDigits - rst.indexOf('.');
	if (rst.charAt(rst.length-1) == '0') {
	  fractionDigits--;
	  totalDigits--;
	}
	if (rst.charAt(0) == '-') totalDigits--;
	strObj.value = rst;
	strObj.fractionDigits = fractionDigits;
	strObj.totalDigits = totalDigits;
	return canonicalized(strObj);
  }
	
  function notValid_integer(strObj) {
    return (strObj.value.search(/^\s*[+-]?\d+\s*$/) != 0);
  }
  
  function canonical_integer(strObj) {
    // we cannot use parseInt because parseInt(010) == 8
    var rst = strObj.value.match(/^\s*0*([+-]?)0*([\d]*)/);
	if (rst[1] == '+') rst[1] = '';
	if (rst[2]) {
	  strObj.value = rst[1] + rst[2]; // should we make it into a number
	  strObj.totalDigits = rst[2].length;
	  strObj.fractionDigits = 0;
	  return canonicalized(strObj);
	}
	strObj.value = 0;
	strObj.totalDigits = 0;
	strObj.fractionDigits = 0;
	return canonicalized(strObj);
  }
	
  function notValid_nonPositiveInteger(strObj) {
    return (notValid_integer(strObj) || parseInt(strObj.value) > 0);
  }
  
  function canonical_nonPositiveInteger(strObj) {
	return canonical_integer(strObj);
  }
	
  function notValid_negativeInteger(strObj) {
    return (notValid_integer(strObj) || parseInt(strObj.value) >= 0);
  }
  
  function canonical_negativeInteger(strObj) {
	return canonical_integer(strObj);
  }
	
  function notValid_nonNegativeInteger(strObj) {
    return (notValid_integer(strObj) || parseInt(strObj.value) < 0);
  }
  
  function canonical_nonNegativeInteger(strObj) {
	return canonical_integer(strObj);
  }
	
  function notValid_positiveInteger(strObj) {
    return (notValid_integer(strObj) || parseInt(strObj.value) <= 0);
  }
  
  function canonical_positiveInteger(strObj) {
	return canonical_integer(strObj);
  }
	
  function notValid_long(strObj) {
    if (notValid_integer(strObj)) return true;
	return (strObj.value < -9223372036854775808 || strObj.value > 9223372036854775807);
  }
  
  function canonical_long(strObj) {
	return canonical_integer(strObj);
  }
	
  function notValid_int(strObj) {
    if (notValid_integer(strObj)) return true;
	return (strObj.value <= -2147483649 || strObj.value >= 2147483648);
  }
  
  function canonical_int(strObj) {
	return canonical_integer(strObj);
  }
	
  function notValid_short(strObj) {
    if (notValid_integer(strObj)) return true;
	return (strObj.value <= -32769 || strObj.value >= 32768);
  }
  
  function canonical_short(strObj) {
	return canonical_integer(strObj);
  }
	
  function notValid_byte(strObj) {
    if (notValid_integer(strObj)) return true;
	return (strObj.value <= -129 || strObj.value >= 128);
  }
  
  function canonical_byte(strObj) {
	return canonical_integer(strObj);
  }
	
  function notValid_unsignedLong(strObj) {
    if (notValid_integer(strObj)) return true;
	return (strObj.value < 0 || strObj.value >= 18446744073709551616);
  }
  
  function canonical_unsignedLong(strObj) {
	return canonical_integer(strObj);
  }
	
  function notValid_unsignedInt(strObj) {
    if (notValid_integer(strObj)) return true;
	return (strObj.value < 0 || strObj.value >= 4294967296);
  }
  
  function canonical_unsignedInt(strObj) {
	return canonical_integer(strObj);
  }
	
  function notValid_unsignedShort(strObj) {
    if (notValid_integer(strObj)) return true;
	return (strObj.value < 0 || strObj.value >= 65536);
  }
  
  function canonical_unsignedShort(strObj) {
	return canonical_integer(strObj);
  }
	
  function notValid_unsignedByte(strObj) {
    if (notValid_integer(strObj)) return true;
	return (strObj.value < 0 || strObj.value >= 256);
  }
  
  function canonical_unsignedByte(strObj) {
	return canonical_integer(strObj);
  }
	
  function notValidFloatOrDouble(strObj,lowExp,highExp) {
    if (strObj.value.search(/^(NaN|INF|-INF)$/) == 0) return false;
	if (isNaN(parseFloat(strObj.value))) return true;
    var rst = strObj.value.match(/^[+-]?(?:\d*)?\.?(?:\d*)?(?:[eE]([+-]?\d+))?$/);
	if (rst) {
	  if (rst[1] && (rst[1] < lowExp || rst[1] > highExp)) return 'Exponent is out of range';
	  return false;
	}
	return true;
  }

  function notValid_double(strObj) {
    return notValidFloatOrDouble(strObj, -323, 308);
  }
  
  function canonical_double(strObj) {
    var rst = strObj.value.match(/^\s*(NaN|INF|-INF)\s*$/);
	var totalDigits, fractionDigits;
    if (rst) return rst[1];
    rst = parseFloat(strObj.value).toString().replace('e','E');
	var decLoc = rst.indexOf('.');
	var expLoc = rst.indexOf('E');
	var exp = 0;
	if (expLoc != -1) exp = parseInt(rst.substr(expLoc+1));
	if (decLoc == -1) { // no decimal pt
	  fractionDigits = 0;
	  if (expLoc == -1) { // no exp
		totalDigits = rst.length;
	    rst = rst + '.0';
	  } else {
	    totalDigits = expLoc;
		rst = rst.substr(0,expLoc) + '.0' + rst.expLoc(expLoc);
	  }
	} else {
	  if (expLoc == -1) {
	    expLoc = rst.length;
	  } else {
	    exp = parseInt(rst.substr(expLoc+1));
	  }
	  fractionDigits = expLoc - decLoc - 1;
	  totalDigits = decLoc + fractionDigits;
	}
	fractionDigits = fractionDigits - exp;
	if (fractionDigits < 0) fractionDigits = 0;
	if (rst.charAt(0) == '-') totalDigits--;
	strObj.value = rst;
	strObj.value.totalDigits = totalDigits;
	strObj.value.fractionDigits = fractionDigits;
	return canonicalized(strObj);
  }
  
  function notValid_float(strObj) {
    return notValidFloatOrDouble(strObj, -44, 38);
  }
  
  function canonical_float(strObj) {
    return canonical_double(strObj);
  }
  
  function notValid_boolean(strObj) {
    return (strObj.value.search(/^\s*(true|false|0|1)\s*$/) != 0);
  }
  
  function canonical_boolean(strObj) {
    strObj.value = (strObj.value.search(/^\s*(true|1)\s*$/) == 0);
	return canonicalized(strObj);
  }
  
  function checkMonthDay(year, month, day) {
    if (year == 0) return false;
    if (month == 0 || month > 12) return false;
	if (month == 2 && day == 29) {
	  if (year < 0) year++;
	  return !(year % 4 && ( !(year % 100) || year % 4000 )); // OK if leap year
	}
	var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	if (day == 0 || day > daysInMonth[month-1]) return false;
	return true;
  }
  
  function checkTZ(hour) {
	return (hour == undefined || hour <= 14);
  }
  
  function notValid_dateTime(strObj) {
    var rst = strObj.value.match(/^\s*(-?\d{4,})-(\d\d)-(\d\d)T(\d\d):[0-5]\d:[0-5]\d(?:\.\d*)?(?:Z|[+-](\d\d):[0-5]\d)?\s*$/);
	if (!rst) return true;
	if (!checkMonthDay(rst[1], rst[2], rst[3])) return true;
	if (rst[4] == 0 || rst[4] > 24) return true;
	if (!checkTZ(rst[5])) return true;
	return false;
  }
  
  function notValid_date(strObj) {
    var rst = strObj.value.match(/^\s*(-?\d{4,})-(\d\d)-(\d\d)(?:Z|[+-](\d\d):[0-5]\d)?\s*$/);
	if (!rst) return true;
	if (!checkMonthDay(rst[1], rst[2], rst[3])) return true;
	if (!checkTZ(rst[4])) return true;
	return false;
  }
  
  function notValid_gYearMonth(strObj) {
    var rst = strObj.value.match(/^\s*-?\d{4,}-(\d\d)(?:Z|[+-](\d\d):[0-5]\d)?\s*$/);
	if (!rst) return true;
	if (rst[1] == 0 || rst[1] > 12) return true;
	if (!checkTZ(rst[2])) return true;
	return false;
  }
  
  function notValid_gYear(strObj) {
    var rst = strObj.value.match(/^\s*-?(\d{4,})(?:Z|[+-](\d\d):[0-5]\d)?\s*$/);
	if (!rst) return true;
	if (rst[1] == 0) return true;
	if (!checkTZ(rst[2])) return true;
	return false;
  }
  
  function notValid_time(strObj) {
    var rst = strObj.value.match(/^\s*(\d\d):[0-5]\d:[0-5]\d(?:\.\d*)?(?:Z|[+-](\d\d):[0-5]\d)?\s*$/);
	if (!rst) return true;
	if (rst[1] == 0 || rst[1] > 24) return true;
	if (!checkTZ(rst[2])) return true;
	return false;
  }
  
  function notValid_gDay(strObj) {
    var rst = strObj.value.match(/^\s*---([0-3]\d)(?:Z|[+-](\d\d):[0-5]\d)?\s*$/);
	if (!rst) return true;
	if (rst[1] == 0 || rst[1] > 31) return true;
	if (!checkTZ(rst[2])) return true;
	return false;
  }
  
  function notValid_gMonthDay(strObj) {
    var rst = strObj.value.match(/^\s*--([01]\d)-([0-3]\d)(?:Z|[+-](\d\d):[0-5]\d)?\s*$/);
	if (!rst) return true;
	if (!checkMonthDay(4, rst[1], rst[2])) return true;
	if (!checkTZ(rst[3])) return true;
	return false;
  }
  
  function notValid_gMonth(strObj) {
    var rst = strObj.value.match(/^\s*--([01]\d)(?:Z|[+-](\d\d):[0-5]\d)?\s*$/);
	if (!rst) return true;
	if (rst[1] == 0 || rst[1] > 12) return true;
	if (!checkTZ(rst[2])) return true;
	return false;
  }
  
  function notValid_duration(strObj) {
    var rst = strObj.value.match(/^\s*-?P(?:\d+Y)?(?:\d+M)?(?:\d+D)?(?:T(?:\d+H)?(?:\d+M)?(?:\d+(?:\.\d+)?S)?)?\s*$/);
	if (!rst) return true;
	return false;
  }
  
  function notValid_string(strObj) {
    return false;
  }
  
  function notValid_normalizedString(strObj) {
  	strObj.value = strObj.value.replace(/\s/g, ' ');
    return false;
  }
  
  function collapseStr(str) {
  	return str.replace(/\s+/g, ' ').replace(/^ /, '').replace(/ $/, '');
  }
  
  function notValid_token(strObj) {
  	strObj.value = collapseStr(strObj.value);
    return false;
  }
  
  function notValid_language(strObj) {
    // TBD : to bw written
    return notValid_token(strObj);
  }
  
  function notValid_NMTOKEN(strObj) {
    notValid_token(strObj);
    return (strObj.value.search(/^[A-Za-z0-9:_.-]+$/) != 0);
  }

  function notValid_NMTOKENS(strObj, idInfo) {
    return !checkValidList(strObj, null, '#NMTOKEN', idInfo);
  }

  function notValid_Name(strObj) {
    notValid_token(strObj);
    return (strObj.value.search(/^[A-Za-z:_][A-Za-z0-9:_.-]*$/) != 0);
  }
	
  function notValid_NCName(strObj) {
    notValid_token(strObj);
    return (strObj.value.search(/^[A-Za-z_][A-Za-z0-9_.-]*$/) != 0);
  }

  function notValid_ID(strObj, idInfo) {
    if (!notValid_NCName(strObj)) {
	  if (idInfo) {
  	    if (idInfo[0][strObj.value]) {
		  return 'The ID ' + doubleQuote(strObj.value) + ' is not unique.';
  		}
  		idInfo[0][strObj.value] = 1;
  	    if (idInfo[1][strObj.value]) {
  		  delete idInfo[1][strObj.value];
  		}
	  }
	  return false;
	}
	return true;
  }
  
  function notValid_IDREF(strObj, idInfo) {
    if (!notValid_NCName(strObj)) {
	  if (idInfo) {
  	    if (!idInfo[0][strObj.value]) {
  		  idInfo[1][strObj.value] = 1;
  		}
	  }
	  return false;
	}
	return true;
  }

  function notValid_IDREFS(strObj, idInfo) {
    return !checkValidList(strObj, null, '#IDREF', idInfo);
  }

  function notValid_anyURI(strObj) {
	var str = strObj.value.replace(/^\s*/, '').replace(/\s*$/, ''); // trim it
	strObj.value = escape(str).replace('%3A', ':');
	canonicalized(strObj);
    return (strObj.value.search(/^\s*.+?:\/\/.+/) != 0); // has slash slash
  }

  function makeValueObj(str) {
    this.value = str;
	return (this);
  }

  function checkValidType(valueObj, metaElm, typeName, idInfo) {
	var error = matchPattern(valueObj, metaElm);
	if (error) return error;
	if (typeof(typeName) == 'object') {
	  var dataSrc = (metaElm['#lt']) ? metaElm['#lt'] : metaElm['#dt'];
	  error = checkValidType(valueObj, dataSrc, dataSrc['#dt'], idInfo);
	  if (error) return error;
	} else if (typeName == '#union') {
	  var union = metaElm['#un'];
	  if (union) {
	    var oneError = '';
	    for (var i=0;i<union.length;i++) { // check thru each item in union, pass if 1 pass
		  oneError = checkValidValue(valueObj, union[i], idInfo);
		  if (!oneError) break;
		  error += oneError + '\n';
		}
		if (oneError) return error;
	  }
	} else if (typeName == '#list') {
	  return checkValidListOfType(valueObj, metaElm, metaElm['#lt'], idInfo);
	} else if (typeName.charAt(typeName.length-1) == '*') {
	  return checkValidListOfType(valueObj, metaElm, typeName.substr(0,typeName.length-1), idInfo);
	} else if (typeName) {
	  if (typeName.charAt(0) == '#') {
	  	typeName = typeName.substr(1);
	    error = eval('notValid_' + typeName + '(valueObj, idInfo)');
	  } else {
	    var userType = document.schema.datatype[typeName];
	    if (userType) {
	      metaElm = userType;
		  var baseType = metaElm['#dt'];
		  error = checkValidType(valueObj, metaElm, baseType, idInfo);
	    }
	  }
	  if (error) {
		 if (typeof(error) != 'string') error = '';
	  	 var newError = doubleQuote(valueObj.value) + ' is not a valid ' + typeName + ' type.';
		 error += (error == newError) ? "\n" : newError;
		 return error;
	  }
	}
	return passRestriction(valueObj, metaElm, typeName);
  }
  
  function getCanonicalValue(strObj, typeName) {
  	if (strObj.canonicalized) return true;
	if (typeof(typeName) == 'object') {
	  return getCanonicalValue(strObj, typeName['#dt']);
	} else if (document.schema.datatype[typeName]) { // user type
	  return getCanonicalValue(strObj, document.schema.datatype[typeName]);
	}
	if (typeName.charAt(0) == '#') typeName = typeName.substr(1);
	try {
	  return eval('canonical_'+typeName+'(strObj)');
	} catch(err) {
	  return canonicalized(strObj);
	}
  }
  
  function checkValidListOfType(valueObj, metaElm, typeName, idInfo) {
	var rst = checkValidList(valueObj, metaElm, typeName, idInfo);
    if (typeof(rst) == 'string') {
	  return rst;
	}
	return '';
  }

  function checkValidValue(valueObj, metaElm, idInfo) {
  	var dt = metaElm ? metaElm['#dt'] : null;
	// TBD field with both datatype and choices
	if (dt) {
	  if (typeof(dt) == 'object') {
	    return checkValidValue(valueObj, dt, idInfo);
		if (error) alert(error);
		return error;
	  } else if (dt.charAt(dt.length-1) == '*') {
	  	return checkValidListOfType(valueObj, metaElm, dt.substr(0,dt.length-1), idInfo);
	  } else if (dt == '#list') {
	  	return checkValidListOfType(valueObj, metaElm, metaElm['#lt'], idInfo);
	  } else {
		return checkValidType(valueObj, metaElm, dt, idInfo);
	  }
	} else if (metaElm && metaElm['#cm']) {
	  if (metaElm['#cm'].search(/<#string>/) < 0)
	  	return 'The content model indicates this should not be a simple value.';
	} else {
  	  return 'We do not recognize this element.';
	}
	return passRestriction(valueObj, metaElm, null);
  }
   
  function matchPattern(v, metaElm) {
  	var pattern = metaElm ? metaElm['#pt'] : null;
	if (pattern) {
	  if (v.value.search('^' + pattern + '$') != 0)
	    return doubleQuote(v.value) + ' does not match the pattern ' + doubleQuote(pattern) + '.';
	}
	return '';
  }
  
  function passRestriction(v, metaElm, typeName) {
	if (typeName) // convert from lexical space to value space
	  getCanonicalValue(v, typeName);
	var enumeration = metaElm ? metaElm['#em'] : null;
	if (enumeration) {
	  var matched = false;
	  for (var i=0;i<enumeration.length;i++) {
		if (v.value == enumeration[i]) {
		  matched = true;
		  break;
		}
	  }
	  if (!matched)
	    return v.value + ' is not one of the choices in ' + doubleQuote(enumeration);
	}
	var constraint = metaElm ? metaElm['#ct'] : null;
	if (constraint) {
      try {
	    var rst;
	    eval('rst='+constraint);
		if (!rst) return 'v.value = ' + doubleQuote(v.value) + ' does not satisify the constraint ' + singleQuote(constraint) + '.';
	  } catch(err) {
	    return err + ' in constraint ' + singleQuote(constraint);
	  }
	} else if (metaElm && metaElm['#lc']) {
   	  return checkValidListOfType(v, metaElm, '');
	}
	return ''; 
  }
  
  function checkValidList(valueObj, metaElm, typeName, idInfo) {
    var errorStr = '';
	var list = valueObj ? valueObj.value.split(/\s+/) : [];
	for (var i=list.length-1;i>=0;i--) {
	  var value = list[i];
	  var valueObj = new makeValueObj(value);
	  if (!value.length || value.charAt[0] == ' ') {
	    list.splice(i,1);
	  } else {
	    var thisError;
		if (!typeName) {
		  thisError = '';
		} else {
		  thisError = checkValidType(valueObj, metaElm, typeName, idInfo);
		}
		if (thisError) {
		  errorStr += thisError + "\n";
		} else {
	  	  getCanonicalValue(valueObj,typeName);
		  list[i] = valueObj.value;
		}
	  }
	}
	if (errorStr) return errorStr;
	var constraint = metaElm ? metaElm['#lc'] : null; // get list constraint
	if (constraint) {
      try {
	    var rst;
	    eval('rst='+constraint);
		if (!rst) return 'list=' + list + ' does not satisify the constraint ' + singleQuote(constraint);
	  } catch(err) {
	    return err + ' in constraint ' + singleQuote(constraint);
	  }
	}
	return list;
  }
  
  function doubleQuote(x) {
    return '"' + x + '"';
  }
  
  function singleQuote(x) {
    return "'" + x + "'";
  }
  
  function getPreference(propName) {
    var preference = document.preference;
	if (propName)
	  window.status = preference[propName]
	else {
	  var total = '';
	  for (var prop in preference) {
	    total += ' ' + prop + ':' + preference[prop] + ';';
	  }
	  window.status = total;
	}
  }
	
  function setPreference(propName, value) {
    var preference = document.preference;
	if (preference[propName] !== undefined) preference[propName] = value;
	getPreference(propName);
  }
	
  function makePreferenceScript() {
	var preference = document.preference;
    var total = '';
    for (var prop in preference) {
      var value = preference[prop];
      if (typeof(value) == 'string') value = doubleQuote(value);
      total += 'preference.' + prop + '=' + value + ";\n";
    }
    return total;
  }
  
  function showPreferenceScript() {
    alert(makePreferenceScript());
  }
	
  function markUpCompatiable(str) {
    var result = str.replace(/&/g, '&amp;');
	result = result.replace(/</g, '&lt;');
	result = result.replace(/>/g, '&gt;');
	result = result.replace(/'/g, '&apos;');
	return result.replace(/"/g, '&quot;'); // " to make project builder happy
  }
    
  function subtractFromArray(theList, items) {
    for (var i=0;i<items.length;i++) {
	  for (var j=0;j<theList.length;j++) {
	    if (items[i] === theList[j]) {
		  theList.splice(j,1);
		  break;
		}
	  }
	}  
  }
	
  function indexOfItemInArray(theList, item) {
    for (var j=0;j<theList.length;j++) {
	  if (item === theList[j]) {
	    return j;
	  }
	}
	return -1;
  }
    
  function indexOfValueInOptions(options, value) {
    for (var j=0;j< options.length;j++) {
	  if (value === options[j].value)  return j;
	}
	return -1;
  }
    
  function addOptionToSelect(select, optionName, optionValue, before) {
    var options = select.options;
	if (indexOfValueInOptions(options, optionValue) != -1) return; // already there, no need to add
	if (before >= 0) {
	  // first make a copy
	  var copy = new Array();
	  for (i=0;i<options.length;i++) {
	    copy.push(options[i]);
	  }
	  copy.splice(before,0,new Option(optionName, optionValue, false, false))
	  // since we can only append, we need to delete everything and put things back to insert
	  options.length = 0;
	  for (var i=0;i<copy.length;i++) {
	    options[i] = copy[i];
	  }
	} else {
	  options[options.length] = new Option(optionName, optionValue, false, false);
	}
  }
	
  function noUndefined(select) {
    if (select.options[0].value == '') {
	  unnilItemOfInput(select);
	  var options = select.options;
	  var i;
	  // first make a copy
	  var copy = new Array();
	  for (i=1;i<options.length;i++) {
	    copy.push(options[i]);
	  }
	  options.length = 0;
	  for (i=0;i<copy.length;i++) {
	    options[i] = copy[i];
	  }
	}
  }
  
  function makeACopy (item ) {
    selectXMLform(); // deselect it so we won't clone the selection color
    var copy = item.cloneNode(true);
	// many of the following is not needed for IE, but won't hurt
	var srcNodes = item.getElementsByTagName('input');
	var dstNodes = copy.getElementsByTagName('input');
	var srcNode,destNode;
	var srcName = '?';
	var dstName;
	for (var i=0;i<srcNodes.length;i++) {
	  srcNode = srcNodes[i];
	  dstNode = dstNodes[i];
	  dstNode.value = srcNode.value;
	  if (srcNode.type == 'radio') {
	    dstNode.value = srcNodes[i].value;
		if (srcNode.name != srcName) {
		  srcName = srcNode.name;
		  dstName = getRealName(srcNode) + ',' + document.preference.radioIndex++;
		}
		dstNode.name = dstName;
		dstNode.checked = srcNode.checked;
		// IE setting checked now would not work, so set another flag first
		if (isIE) dstNode.shouldBeChecked = srcNode.checked;
	  } else
		dstNode.defaultValue = srcNode.value;
	}
	srcNodes = item.getElementsByTagName('textarea');
	dstNodes = copy.getElementsByTagName('textarea');
	for (var j=0;j<srcNodes.length;j++) {
	  dstNodes[j].value = srcNodes[j].value;
	  dstNodes[j].defaultValue = srcNodes[j].value;
	}
	srcNodes = item.getElementsByTagName('select');
	dstNodes = copy.getElementsByTagName('select');
	for (var k=0;k<srcNodes.length;k++) {
	  dstNodes[k].selectedIndex = srcNodes[k]. selectedIndex;
	}
    copy.ondblclick = item.ondblclick;
	return copy;
  }
  
  function copyTextAttribute(src, dst) {
    dst.value = getInputValue(src);
	dst.className = src.className;
	dst.name = getRealName(src);
	dst.disabled = src.disabled;
  }
  
  function htmlToNode(htmlStr) {
    var node = document.createElement('div');
	node.innerHTML = htmlStr;
	return node.firstChild;
  }
  
  function goThruInputs(item, func) {
    checkEachNode(item.getElementsByTagName('input'), func);
	checkEachNode(item.getElementsByTagName('textarea'), func);
  }
  
  function checkEachNode(nodeList, func) {
    for (var i=nodeList.length-1;i>=0;i--) { // revese order because we may be deleting
	  var item = nodeList[i];
	  if (item.type != 'hidden') func(item);
	}
  }
  
  function enableInputs(item) {
    var itemName = item.name;
	if (itemName.charAt[0] == '~') item.name = itemName.substr(1);
	item.disabled = false;
  }
  
  function disableInputs(item) {
    var itemName = item.name;
    if (itemName.charAt[0] != '~') item.name = '~' + item.name;
	item.disabled = true;
  }
  
  function focusGained(item) {
	var tag = item.tagName;
	if (tag =='INPUT' || tag =='TEXTAREA') {
      focusField = getItemOfInput(item);
	} else
	  focusField = null;
  }
  
  function keyhit(evt) {
	
	function switchFocus(evt) {
	  var item = xmlSelection;
	  if (item) {
	    selectXMLform();
		if (xmlType(item) <= XMLsimpleType) {
		  var input = getInputOfItem(item);
		  if (input) {
	//	    var index = -1;
	//	    if (input.tagName == 'SELECT') {
	//		  index = input.selectedIndex;
	//	    }
		    input.focus();
		    if (input.tagName != 'SELECT') input.select();
	//	    if (index >= 0) {
	//		  input.selectedIndex = index;
	//	    }
		  }
	    }
	  } else {
	    var input = isIE ? evt.srcElement : evt.target;
		var tag = input.tagName;
		var isInput = (tag =='INPUT' || tag =='TEXTAREA' || tag =='SELECT' || tag =='OPTION');
		if (isInput) {
		  input.blur();
		  selectXMLform(getItemOfInput(input));
		}
	  }
	  return false;
	}
		
	function getTab(item) {
	  var itemType = xmlType(item);
	  var dest;
	  if (itemType > XMLsimpleType) {
	  	 dest = getXMLfirstChild(item, true);
		 if (dest) return dest;
	  }
	  dest = getXMLnextSibling(item);
	  var next = item;
	  while (!dest) {
	    if (isRoot(next)) return next;
		next = getParent(next);
		dest = getXMLnextSibling(next);
	  }
	  return dest;
	}
		
	function getShiftTab(item) {
	  var prev = getXMLprevSibling(item);
	  if (!prev) {
	    if (isRoot(item))
	  	  prev = item
		else
		  return getParent(item);
	  }
	  while (prev) {
	    if (xmlType(prev) >= XMLsimpleContent) {
		  var dest = getXMLlastChild(prev, true);
		  if (!dest) return prev;
		  prev = dest;
		} else
		  return prev;
	  }
	  return null; 
	}
		
	function getParent(item) {
	  var dest = getXMLparent(item);
	  if (dest && xmlType(dest) == XMLsimpleType) dest = item.parentNode;
	  return dest;
	}
		
    function getPrevSibling(item) {
	  var dest = getXMLprevSibling(item);
	  if (dest) return dest;
	  if (isSimpleWithAttribute(item))
	    return (getXMLprevSibling(item.parentNode));
	  return null;
	}

    function getNextSibling(item) {
	  var dest = getXMLnextSibling(item);
	  if (dest) return dest;
	  if (xmlType(item) == XMLattribute && xmlType(item.parentNode) == XMLsimpleContent)
	    return (getXMLnextSibling(item.parentNode));
	  return null;
	}

	function getFirstChild(item) {
	  if (xmlType(item) < XMLsimpleContent) {
	  	 switchFocus();
	  	 return null;
	  }
	  var dest = getXMLfirstChild(item);
	  if (dest) return dest;
	  // it may be that we have attributes but no child element
	  return getXMLfirstChild(item, true);
	}
		
	function getTwin(item, func) {
	  var elemDesc = getElementDescription(item);
	  var nextItem = item;
	  var toAvoid = null;
	  var isSimple = false;
	  if (isSimpleWithAttribute(item)) {
	    toAvoid = item.parentNode;
		isSimple = true;
	  } else if (xmlType(item) == XMLsimpleContent)
	    toAvoid = getXMLfirstChild(item);
	  do {
	    nextItem = func(nextItem);
	    // TBD : what about complexContent vs mixedContent
		if (nextItem == toAvoid) continue;
		var thisElemDesc = getElementDescription(nextItem);
		if (thisElemDesc.itemName == elemDesc.itemName && thisElemDesc.parentName == elemDesc.parentName) break;
      } while (item != nextItem)
	  if (xmlType(item) == XMLsimpleType && xmlType(nextItem) == XMLsimpleContent)
	    nextItem = getXMLfirstChild(nextItem);
	  return nextItem;
	}
	
	function getNextTwin(item) {
	  return getTwin(item, getTab);
	}
			
	function getPrevTwin(item) {
	  return getTwin(item, getShiftTab);
	}
			
	function goToElement(evt, func) {
	  var item = xmlSelection;
	  if (item) {
	    var dest = func(item);
		if (dest) {
		  revealElm(dest);
		  if (!isIE) evt.preventDefault();
		  return false;
		}
	  }
	  return true;
	}
	
	if (!evt) evt = window.event;
	var alt = isOpera ? evt.ctrlKey : evt.altKey;
//window.status = evt.keyCode;
	switch (evt.keyCode) {
	  case 9:
	    return goToElement(evt, evt.shiftKey ? getShiftTab : getTab);
	  case 27:
	    return switchFocus(evt);
	  case 37:
	    if (isIE && alt) break;
	    return goToElement(evt, alt ? getShiftTab : getParent);
	  case 38:
	    return goToElement(evt, alt ? getPrevTwin : getPrevSibling);
	  case 39:
	    if (isIE && alt) break;
	    return goToElement(evt, alt ? getTab : getFirstChild);
	  case 40:
	    return goToElement(evt, alt ? getNextTwin : getNextSibling);
	  default:
	    break;
	}
	return true;
  }
	
  function selectXMLform (newSelect) {
    var form = document.xmlForm;
    var oldSelect = xmlSelection;
    if (oldSelect) {
        oldSelect.style.backgroundColor = oldSelect.originalColor;
        // delect oldSelect.originalColor;
    }
    if (newSelect) {
      xmlSelection = newSelect;
      newSelect.originalColor = newSelect.style.backgroundColor;
      newSelect.style.backgroundColor  = "#0469B3";
    } else
	  xmlSelection = null;
  }

  function guessMetaInfo(elementName) {
    if (document.schema.content[elementName]) return document.schema.content[elementName];
	var toMatch = ',' + elementName + '$';
	for (var name in document.schema.content) {
	  if (name.search(toMatch) > 0) {
		  return document.schema.content[name];
	  }
	}
    return null;
  }

  function getSchema(elementName) {
    var schemaElm = document.schema.content[elementName];
	if (schemaElm) {
	  return schemaElm['#cm'];
	}
    return null;
  }

  function setSchema(element, data) {
	document.schema.content[element] = data;
  }

  function setTypeDef(type, data) {
	document.schema.datatype[type] = data;
  }

  function makeSchemaScript() {
    function getValueStr(value) {
 	  var rst;
	  switch (typeof(value)) {
	    case 'string':
		  return singleQuote(value);
		case 'object': // array or assoc list
		  if (value.splice) { // it is an array
		    rst = '[';
		    for (var i=0;i<value.length;i++) {
		      rst += getValueStr(value[i]) + ',';
			}
		    return rst.substr(0,rst.length-1) + ']';
		  } else { // it is an assoc list
		    rst = '{';
			for (var key in value) {
			  var valueStr = getValueStr(value[key]);
			  if (key == '#pt') {
			    valueStr = valueStr.replace(/\\/g, "\\\\");
			  } else if (key == '#dc') {
			    valueStr = valueStr.replace(/\n/g, "\\n");
			  }
			  rst += "'" + key + "':" + valueStr + ",";
			}
		    return rst.substr(0,rst.length-1) + '}';
		  }
		default:
		  return value;
	  }
	}
	
    var total = '';
	var value;
	var content = document.schema.content;
    for (var elm in content) {
      total += "setSchema('" + elm + "'," + getValueStr(content[elm]) + ");\n";
    }
	var types = document.schema.datatype;
    for (var type in types) {
      total += "setTypeDef('" + type + "'," + getValueStr(types[type]) + ");\n";
    }
    return total;
  }
  
  function showSchemaScript() {
    alert(makeSchemaScript());
  }
	
  function getMetaElementByPath(path) {
	var pathLevel = path.length;
	var metaData;
	for (var i=0;i<pathLevel;i++) {
	  metaData = document.schema.content;
	  for (var j=i;j<pathLevel;j++) {
	    if (metaData['#ph']) { // if type has a special path, try it first
		  var typeElement = metaData['#ph']+path[j];
	      metaData = metaData[path[j]];
		  if (!metaData) {
		    metaData = document.schema.content[typeElement];
		  }
	    } else
	      metaData = metaData[path[j]];
		if (!metaData) break;
	  }
   	  if (metaData) return metaData;
	}
    return null;
  }

  function getMetaDataByPath(path, key) {
    var metaData = getMetaElementByPath(path);
	if (!metaData) return metaData;
	return metaData[key];
  }
  
  function getMetaElement(xmlNode) {
	var path = new Array();
	if (xmlType(xmlNode.parentNode) == XMLsimpleContent && xmlType(xmlNode) != XMLattribute) {
	  path.push('');
	}
	var testNode = xmlNode;
	while (testNode) {
	  var name = getXMLelementName(testNode);
	  if (xmlType(testNode) == XMLattribute) name = '@' + name;
	  path.push(name);
	  testNode = getXMLparent(testNode);
	}
	path.reverse();
	var metaElm = getMetaElementByPath(path);
	if (metaElm && xmlType(xmlNode) == XMLsimpleType && metaElm['']) {
	   metaElm = metaElm[''];
	}
	return metaElm;
  }

  function getItemMetaData(xmlNode, key) {
    var elm = getMetaElement(xmlNode);
	if (!elm) return elm;
	return elm[key];
  }
  
  function humanReadableRegexp(name, regexp) {
	regexp = regexp.replace(/<#string>/g, '<a string>');
	regexp = regexp.replace(/<@(.*?)>/g, "<attribute $1>");
	regexp = regexp.replace(/\)(.*?)\(/g, ")$1, (").replace(/\(</g, '').replace(/>\)/g, '');
	regexp = regexp.replace(/\|,/g, ' or');
	regexp = regexp.replace(/\?/g, '(optional)').replace(/\+/g, '(1 or more times)');
	regexp = regexp.replace(/\*/g, '(0 or more times)');
	while (true) {
	  var matchRst = regexp.match(/{(.+?)(,?)(.*?)}/);
	  if (!matchRst) break;
	  var replacement = '(' + matchRst[1];
	  if (matchRst[3]) {
	    replacement += ' to ' + matchRst[3];
	  } else if (matchRst[2]) {
	    replacement += ' or more';
	  }
	  replacement += ' times)';
	  regexp = regexp.replace(matchRst[0], replacement);
	}
	return name + ' has a content model of ' + regexp;
  }

  function getErrorElementName(item) {
    return 'Element ' + doubleQuote(getXMLelementName(item));
  }
  
  function checkTagSequence(parent, elementList, nilled, exceptAttribute) {
    function schemaOrderSort(item1, item2) {
	  var tag1 = '<' + getXMLelementName(item1) +'>';
	  var tag2 = '<' + getXMLelementName(item2) +'>';
	  return (schema.indexOf(tag1) - schema.indexOf(tag2));
	}
	
    var tagSequence = '';
	var parentType = xmlType(parent);
  	var metaElm = getMetaElement(parent);
	if (nilled && !metaElm['#ni']) return getErrorElementName(parent) + ' is nil but it is not nillable';
	var schema = '';
	if (metaElm) schema = metaElm['#cm'];
	if (!schema) {
	  if (metaElm && metaElm['#dt'] == '#anyType') return null;
	  return 'This is not a valid element under this context';
	}
	var regexp = schema.replace(/<(?:[^>])*,/g, '<');
	// TBD : use sort to get attributes in order may be cleaner
	var attributeNames = getXMLattributeNames(parent, regexp);
	if (attributeNames) {
	  tagSequence = attributeNames.join('');
	  if (exceptAttribute) {
	    tagSequence = tagSequence.replace('<@' + exceptAttribute + '>', '');
	  }
	}
	if (nilled) {
	  regexp = regexp.replace(/(?:\(\(|\(<[^@]).*/, '');
	}
	if (elementList) {
  	  var metaElm = getMetaElement(parent);
	  if (metaElm && metaElm['#al']) {
	  	elementList.sort(schemaOrderSort);
	  }
	  for (var i=0; i< elementList.length; i++) {
	    tagSequence += '<' + getXMLelementName(elementList[i]) +'>';
	  } 
	} else if (parentType == XMLsimpleContent || parentType == XMLsimpleType) {
	  tagSequence += '<#string>';
	  if (!schema) schema = '<#string>';
	  if (!regexp) regexp = '<#string>';
	}
	if (tagSequence.search('^' + regexp + '$') == -1) {
	  var typeInfo = null;
//	  var metaElm = getMetaElement(parent);
	  var parentName = getErrorElementName(parent);
	  if (metaElm) typeInfo = getTypeInfo(parentName, metaElm);
	  tagSequence = tagSequence.replace(/<@(.*?)>/g, "<attribute $1>");
	  tagSequence = tagSequence.replace(/></g, ', ').substr(1, tagSequence.length-2);
	  var tagArray = tagSequence.split(', ');
	  tagSequence = '';
	  var prevItem = tagArray[0];
	  var repeatCount = 1;
	  for (var j=1;j<tagArray.length;j++) {
	    if (tagArray[j] == prevItem) {
		  repeatCount++;
		} else {
		  tagSequence += prevItem;
		  if (repeatCount > 1) tagSequence += '(' + repeatCount + ' times)';
		  tagSequence += ', ';
		  prevItem = tagArray[j];
		  repeatCount = 1;
		}
	  }
	  tagSequence += prevItem;
	  if (repeatCount > 1) tagSequence += '(' + repeatCount + ' times)';
	  var errorMsg = "Content model mismatch.\n" + parentName + " content is " + tagSequence + ".\n";
	  if (typeInfo) return errorMsg + typeInfo;
	  return errorMsg + humanReadableRegexp(parentName, regexp);
	}
	return null;
  }
	
  function okToProceed(prompt, parent, elementList, exceptAttribute) {
    if (!document.preference.checkSchema) return true;
    var error = checkTagSequence(parent, elementList, false, exceptAttribute);
	if (!error) return true;
	return overrideSchema(prompt + '. ' + error);
  }
  
  function overrideSchema(prompt) {
    var preference = document.preference;
	if (!preference.checkSchema) return true;
	if (preference.obeySchema) {
	  alert(prompt + '. Operation is forbidden by the schema.');
	  return false;
	}
	return (confirm(prompt + '. Do you still want to do it?'));
  }
	
  function updateSchema(element, schema) {
    if (document.preference.obeySchema) return false;
	var obj = new Object();
	obj['#cm'] = schema;
	setSchema(element, obj);
  }
	
//
  function selectelm(x, evt) {
    if (isIE) {
      evt.cancelBubble = true;
    } else {
      evt.stopPropagation();
    }
//	var isInput = isIE ? (evt.srcElement.tagName=='INPUT' || evt.srcElement.tagName=='TEXTAREA' || evt.srcElement.tagName=='SELECT')
//	                   : (evt.target instanceof HTMLInputElement || evt.target instanceof HTMLSelectElement);
	var tag = isIE ? evt.srcElement.tagName : evt.target.tagName;
	var isInput = (tag =='INPUT' || tag =='TEXTAREA' || tag =='SELECT' || tag =='OPTION');
    if (isInput) {
      if (evt.type == 'click') {
        selectXMLform(); // deselect it
      } else {
        // what should we do here
        selectXMLform(); // double click on text field select it
      }
	  // IE radio button does not work, so do it by JavaScript
	  if (isIE && evt.srcElement.type == 'radio') { 
	    var radios = evt.srcElement.parentNode.getElementsByTagName('input');
	  	for (var i=0;i<radios.length;i++) radios[i].checked = false;
	  	evt.srcElement.checked = true;
      }
    } else if (evt.type == 'click') {
       selectXMLform(x);
    } else {
      if (evt.ctrlKey) {
        duplicateElm(x);
      } else {
        hideOrShowChildrenOfElm( x, 0);
      }
    }
  }
  
  function clickFormBody(x, evt) {
    var tag = isIE ? evt.srcElement.tagName : evt.target.tagName;
	if (tag =='FORM') {
	  selectXMLform();
	  focusField = null;
	}
  }

  function hideOrShowChildrenOfElm (item, expand) {
    // expand == -1 expand, == 0 toggle, == 1 collapse
	
    var fieldSet = getChildByTagNames(item, ['FIELDSET']);
    var expandState = 0;
    if (fieldSet) {
      var legend = getChildByTagNames(fieldSet,['LEGEND']);
      if (legend) {
        var expandSymbol = legend.innerHTML.charAt(0);
        if (expandSymbol == '+') { 
          expandState = 1;
        } else if (expandSymbol == '-') {
          expandState = -1;
        }
      }
      if (expandState != 0 && expand * expandState >= 0) {
        for (var j=0;j<fieldSet.childNodes.length;j++) {
          var node = fieldSet.childNodes[j];
          if (node.nodeType == 1 && node.tagName != 'LEGEND') {
            if (expandState == -1) {
              node.style.display = 'none';
            } else {
              node.style.display = 'block'; // 'inherit';
            }       
          }
        }
        if (expandState == -1) {
          legend.innerHTML = legend.innerHTML.replace('-', '+');
        } else if (expandState == 1) {
          legend.innerHTML = legend.innerHTML.replace('+', '-');
        }
      }
    }
    if (expandState == 0) {
      alert('you can only expand or collapse element with child elements');
      return false;
    }
    return true;
  }

  function expandElm (item) {
    return hideOrShowChildrenOfElm(item, +1);
  }
  
  function collapseElm (item) {
    return hideOrShowChildrenOfElm(item, -1);
  }
	
  function checkRadio(x) {
    if (isIE) { // IE checked does not work unless set after added to document
	  var inputs = x.getElementsByTagName('input');
	  for (var i=0;i<inputs.length;i++) {
	    var node = inputs[i];
	  	if (node.type == 'radio' && node.shouldBeChecked) node.checked = true;
	  }
	}
  }

  function duplicateElm (item ) {
    if (xmlType(item) == XMLattribute) {
	  alert("Cannot duplicate an attribute because you don't want two attributes with same name");
	  return false;
    } else if (isSimpleWithAttribute(item)) {
	  alert("The element has attributes, you need to select the whole element if you want to duplicate it");
	  return false;
    } else if (rejectRoot(item)) {
	  return false;
	} else {
	  var parent = getXMLparent(item);
	  var childList = getXMLchildren(parent);
	  childList.splice(indexOfItemInArray(childList, item), 0, item);
	  if (!okToProceed('We should not duplicate this element', parent, childList)) return false;
	  var copy = makeACopy(item);
	  item.parentNode.insertBefore(copy, item.nextSibling);
	  checkRadio(copy);
	  revealElm( copy ); // select the new copy
	  return true;
	}
  }
  
  function copyElm (item ) {
    selectXMLform(); // deselect it so we won't clone the selection color
    document.xmlForm.scrap = makeACopy(item);
    selectXMLform( item ); // select it again
	return true;
  }
  
  function cutElm (item) {
    // essentially delete + removeDeleted + put on scrap
	if (rejectRoot(item)) return false;
	deleteElm(item);
	removeDeletedElm(item);
	goThruInputs(item, enableInputs);
	if (isIE) {
	  document.xmlForm.scrap = item;
	} else { // to get around Moz bug
	  document.xmlForm.scrap = makeACopy(item);
	}
	return true;
  }
  
  function pasteElm (item, where) {
    function checkScrap () {
      if (document.xmlForm.scrap) {
        return makeACopy(document.xmlForm.scrap);
      } else {
        alert('Nothing to paste, cut or copy something first');
        return null;
      }
    }
	
    function addAttribute(container, copy, skipFirst, before) {
      var nodeList = container.childNodes;
      var attributeList = new Array();
      for (var i=0;i<nodeList.length;i++) {
        var node = nodeList[i];
        if (xmlType(node) == XMLattribute) {
          attributeList.push(node);
		}
	  }
			
	  var attributeName = copy.getElementsByTagName('span')[0].className;
	  for (var i=0;i<attributeList.length;i++) {
	    var node = attributeList[i];
		if (node.getElementsByTagName('span')[0].className == attributeName) {
		  if (confirm('This attribute alreay exists in the destination node, do you want to replace it?')) {
			container.replaceChild(copy, node);
			return true;
		  } else {
		    return false;
		  }
	    }
	  }
	
	  // TBD: rewrite this, too confusing
	  // we are adding an attribute to the element, we may need to update schema
	  var element;
	  if (container.className == 'XMLsimpleContent') {
	    element = getXMLelementName(container);
	  } else {
	    element = container.className;
	  }
	  var attribName = getXMLelementName(copy);
	  var attribReg = '\\\(<@' + attribName + '>\\\)';
	  var schema = getSchema(element);
	  if (!schema || schema.search(attribReg) < 0) { // attribute is not in schema
	    if (!overrideSchema('Attribute "' + attribName + '" is not in the content model of element "' + element + '"')) {
		  return false;
		}
	  }
	  if (!before) {
	    if (attributeList.length)
		  before = attributeList[attributeList.length-1].nextSibling
		else if (skipFirst)
		  before = null
		else
		  before = container.firstChild;
	  }
	  container.insertBefore(copy, before);
	  checkRadio(copy);
	  return true;
	}
		
	function simpleToComplex (item) {
	  // when an attribute is added to simple type, it becoms complex type
	  var complexNode = getPrototype('$');
	  item.parentNode.replaceChild(complexNode, item);
	  complexNode.appendChild(item);
	  return complexNode;
	}
		
	function pasteAttribute(item, copy, where) {
	  var pasteOK = false;
	  var destType = xmlType(item);
	  if (where == 'into') {
	    if (destType == XMLsimpleContent) {
		  pasteOK = addAttribute(item, copy, true);
		} else if (isSimpleWithAttribute(item)) {
		  pasteOK = addAttribute(item.parentNode, copy, true);
		} else if (destType == XMLsimpleType) {
		  pasteOK = addAttribute(simpleToComplex(item), copy, true);
		} else if (destType < XMLsimpleType) {
		  return alert ('You cannot put an attribute here');
		} else { // complex content and mixed content
		  var container = null;
		  var nodeList = item.childNodes;
		  for (var i=0;i<nodeList.length;i++) {
		    var node = nodeList[i];
//		  	if (node.hasChildNodes()) {  // not supported by IE
		  	if (node.childNodes.length) {
		      container = node;
		      break;
		    }
		  }
		  pasteOK = addAttribute(container, copy, false); 
		}
	  } else { // before or after or replace, only if dest is attribute
	    if (destType != XMLattribute) {
		  if (destType >= XMLsimpleType) {
		    return alert('If you want to add an attribute to element, use Paste Into');
		  } else {
		    return alert('You cannot put an attribute here');
		  }
		} else {
		  pasteOK = addAttribute(item.parentNode, copy, false, where == 'before' ? item : item.nextSibling);
		  if (where == 'replace' && pasteOK) {
		    if (item.parentNode) item.parentNode.removeChild(item); // if original still there, remove it
		  }
		} 
	  }
	  if (pasteOK) revealElm( copy ); // select the new copy the selection
	  return pasteOK;
	}
		
	function pasteAny (item, copy, where) {
	  if (isSimpleWithAttribute(item)) item = item.parentNode;
	  var xmlParent = (where == 'into') ? item : getXMLparent(item);
	  if (xmlType(xmlParent) != XMLmixedContent) { // if mixed we accept anything, don't look at schema
		var childList = getXMLchildren(xmlParent);
		switch (where) {
		  case 'into':
			if (childList) {
			  childList.push(copy);
			} else {
			  childList = [copy];
			}
			break;
			// TBD: paste into simpletype of complextype
		  case 'replace':
			if (childList) {
			  childList.splice(indexOfItemInArray(childList,item), 1, copy);
			} else {
			  childList = [copy];
			}
			break;
		  default:
			var index = indexOfItemInArray(childList, (where=='before')?item:item.nextSibling);
			if (index >= 0) {
			  childList.splice(index, 0, copy);
			} else {
			  childList.push(copy);
			}
		}
		if (!okToProceed('We should not paste the element', xmlParent, childList)) return false;
	  }
	  switch (where) {
		case 'before':		  
		  if (xmlType(copy) != XMLattribute && xmlType(item) == XMLattribute) {
		    alert('Elements cannot come before attribute.');
			selectXMLform(item);
			return;
		  }
		  item.parentNode.insertBefore(copy, item);
		  break;
		case 'after':
		  if (xmlType(copy) != XMLattribute) isNil(getXMLparent(item), true);
		  item.parentNode.insertBefore(copy, item.nextSibling);
		  break;
		case 'into':
		  if (xmlType(copy) != XMLattribute) isNil(item, true);
		  var nodeList = item.childNodes;
		  for (var i=0;i<nodeList.length;i++) {
//			if (nodeList[i].hasChildNodes()) { // not supported by IE
			if (nodeList[i].childNodes.length) {
			  nodeList[i].appendChild(copy);
			  break;
			}
		  }
		  break;
		case 'replace':
		  item.parentNode.replaceChild(copy, item);
		  break;
		default:
		  return;
	  }
	  checkRadio(copy);
	  selectXMLform( copy ); // select the new copy the selection
	  return true;
	} // pasteAny
  
	// start of pasteElm
		var copy = checkScrap();
		if (copy) {
			var srcType = xmlType(copy);
			var destType = xmlType(item);
			if (srcType == XMLanonymous) {
				alert ('TBD: insert anonymous');
				return false;
			} else if (srcType == XMLattribute ) {
				return pasteAttribute(item, copy, where);
			} else if (destType >= XMLcomplexContent) { // complex or mixed content
				if (where != 'into') { // into, just pasteAny
					if (isRoot(item)) {
						alert('Cannot paste outside of the root element');
						return false;
					}
					// else pasteAny
				}
			} else { // simple type or complex type or attribute
				if (where == 'into') {
					if (srcType >= XMLsimpleType) {
						alert('Only attribute can go into a simple element');
						return false;
					}
				} else if (where == 'replace') {
					if (destType == XMLattribute) {
						alert('An element cannot replace an attribute');
						return false;
					}
				}
			}
			return pasteAny(item, copy, where);
		}
	}
	
  function deleteElm(item) {
    if (rejectRoot(item)) return false;
	  selectXMLform(); // deselect it so we won't it won't be on selection
	  if (isSimpleWithAttribute(item)) {
	    // this element has attribute, so we have to delete the attributes as well
		return deleteElm(item.parentNode);
	  } else {
	    var ok;
		var xmlParent = getXMLparent(item);
		if (xmlType(item) == XMLattribute) {
		  var childList = getXMLchildren(xmlParent);
		  ok = okToProceed('We should not delete this attribute', xmlParent, childList, getXMLelementName(item));
		} else {
		  var childList = getXMLchildren(xmlParent);
		  childList.splice(indexOfItemInArray(childList, item), 1);
		  ok = okToProceed('We should not delete this element', xmlParent, childList);
		}
		if (!ok) {
		  selectXMLform(item ); // select it again
		  return false;
		}
		var parent = item.parentNode;
		var delNode = document.createElement('del');
		parent.insertBefore(delNode, item);
		delNode.appendChild(parent.removeChild(item));
		goThruInputs(item, disableInputs);
		selectXMLform(item ); // select it again
		return true;
	  }
  }

  function removeDeletedElm(item) {
    function removeDel(x) {
      x.parentNode.removeChild(x);
	}
		
	if (isDeleted(item)) {
	  selectXMLform(); // deselect it because the selection will be gone
	  var isAttribute = (xmlType(item) == XMLattribute);
	  var container = getItemOfInput(item);
	  removeDel(item.parentNode);
	  if (isAttribute && xmlType(container) == XMLsimpleContent) {
	    var nodeList = container.childNodes;
		var moreAttribute = false;
		var simpleNode = null;
		// do we have more attributes?
		for (var i=0;i<nodeList.length;i++) {
		  var theType = xmlType(nodeList[i]);
		  if (theType == XMLsimpleType) {
		    simpleNode = nodeList[i];
		  } else if (theType == XMLattribute) {
		    moreAttribute = true;
		  	break;
		  }
		}
		if (!moreAttribute && simpleNode) {
		  // no more attribute, we don't need the complexType container
		  container.parentNode.replaceChild(simpleNode, container);
		}
	  }
	} else {
	  checkEachNode(item.getElementsByTagName('del'), removeDel);
	}
	return true;
  }
  
  function clearElm(item, ignoreNil) {
  	// TBD : if there is a default value, use it instead of empty string
    function clearField(x) {
	  x.value = '';
	}
		
    function clearInput(x) {
	  if (x.type == 'text') {
	    x.value = ''
	  } else if (x.type == 'radio') {
	    x.checked = (x.value == '');
    	var nodeList = x.parentNode.childNodes;
		var firstAttribute = null;
    	for (var i=0;i<nodeList.length;i++) {
      	  var node = nodeList[i];
      	  if (node.tagName == 'INPUT') {
		    if (node.value == '' && (node.type == 'radio' || node.type == 'hidden')) return;
          	if (!firstAttribute && node.name.charAt(0) == '@') firstAttribute = node;
	  	  }
	    }
		var name = x.name.replace(/,.*/, '');
		x.parentNode.insertBefore(htmlToNode('<input type="hidden" value="" name="' + name + '"/>'), firstAttribute);
		x.parentNode.innerHTML = x.parentNode.innerHTML.replace(/radioClicked\(this\)/g, 'removeNoRadio(this)');
	  }
	}
		
    function unselectField(x) {
	  if (x.value != '') {
	    x.value = '';
	  	addOptionToSelect(x, '**Undefined**', '', 0);
	  	x.selectedIndex = 0;
	  }
	}
	
	function reborn(item) {
	  if (xmlType(item) < XMLcomplexContent) return;
	  selectXMLform();
	  var node, i, input;
	  var attributes = new Object();
	  var nodeList = getChildByTagNames(item, ['FIELDSET']).childNodes;
	  for (i=0;i<nodeList.length;i++) {
  	    node = nodeList[i];
  		if (xmlType(node) == XMLattribute) {
      	  input = getInputOfItem(node);
		  attributes[input.name] = input.value;
  		}
      }
	  var name = getXMLelementName(item);
	  var metaElm = getMetaElement(item);
	  if (!metaElm) metaElm = guessMetaInfo(name);
      var newItem = makeKnownElement(name, metaElm);
	  item.parentNode.replaceChild(newItem,item);
	  var parent = getChildByTagNames(newItem, ['FIELDSET']);
	  nodeList = parent.childNodes;
	  for (i=nodeList.length-1;i>=0;i--) {
  	    node = nodeList[i];
  		if (xmlType(node) == XMLattribute) {
       	  input = getInputOfItem(node);
		  var oldValue = attributes[input.name];
		  if (oldValue) {
	  	    input.value = oldValue;
		  } else if (oldValue == undefined) {
	  	    parent.removeChild(node);
		  }
  		}
	  }
	  selectXMLform(newItem);
	}
	
	if (!ignoreNil && isNil(item)) {
	  isNil(item, true);
	  reborn(item);
	} else {
	  checkEachNode(item.getElementsByTagName('input'), clearInput);
	  checkEachNode(item.getElementsByTagName('textarea'), clearField);
	  checkEachNode(item.getElementsByTagName('select'), unselectField);
	}
	return true;
  }
	
  function addNilAttribute(item) {
    // TBD simpleType inside simpleContent is special case
	var nilVal = document.preference.xsiPrefix;
	if (!nilVal) {
	  // TBD : make an xsi attribute in root element
	  nilVal = 'xsi:';
	}
	nilVal = '@' + nilVal + 'nil';
	var itemType = xmlType(item);
    var parentNode = (itemType==XMLsimpleContent)?item:getChildByTagNames(item, ['FIELDSET','DIV','SPAN']);
	if (!parentNode) return false;
	nilAttribute = htmlToNode('<input type="hidden" name="' + nilVal + '" value="true"/>');
    var nodeList = parentNode.childNodes;
    for (var i=0;i<nodeList.length;i++) {
	  var node = nodeList[i];
	  var iTag = node.tagName;
      if ( iTag == 'INPUT' || iTag == 'SELECT' || iTag == 'TEXTAREA' ) {
	    if ( itemType == XMLsimpleType ) {
//		  parentNode.insertBefore(nilAttribute, node.nextSibling); 
		  parentNode.appendChild(nilAttribute);
	  	  parentNode.innerHTML = parentNode.innerHTML.replace(/textChanged\(this\)/, 'unnilIfChanged(this)');
		  clearElm(item, true); 
		  return true;
		} else if ( itemType > XMLsimpleContent) {
		  if (node.name == '.tg') {
		    parentNode.insertBefore(nilAttribute, node.nextSibling); 
			for (var j=nodeList.length-1;j>=0;j--) {
			  node = nodeList[j];
			  iTag = node.tagName;
			  if ( iTag == 'DIV' || iTag == 'SPAN' ) {
			    if (node.className != 'XMLattribute') {
				  parentNode.removeChild(node);
				} else
				  return true;
			  }
			}
			return true;
		  }
		}
	  } else if ( iTag == 'DIV' || iTag == 'SPAN' ) { 
	    if (itemType==XMLsimpleContent && className == 'XMLsimpleType') {
		  clearElm(node, true);
		  parentNode.insertBefore(nilAttribute, node.nextSibling); 
		  return true;
		}
	  }
    }
	return true;
  }
  
  function nilElm(item) {
   if (isSimpleWithAttribute(item)) return nilElm(item.parentNode);
   if (isNil(item)) return true;
	var nodeType = xmlType(item);
	if (nodeType < XMLsimpleType) {
	  alert('You can only nil an element.');
	  return false;
	} else {
	  if (document.preference.checkSchema || document.preference.obeySchema) {
  	    var metaElm = getMetaElement(item);
	    if (metaElm && !metaElm['#ni']) {
		  if (!overrideSchema(getErrorElementName(item) + ' is not nillable')) return false;
		}
	  }
	  addNilAttribute(item);
	}
  }
  
  function revealElm(item) {
    var parent = item;
	while (parent != null) {
	  if (xmlType(parent) > XMLsimpleContent) expandElm(parent);
	  parent = getXMLparent(parent);
	}
	selectXMLform(item); // so the user know which element we are talking about
//	if (item.scrollIntoView) // not supported by opera
	item.scrollIntoView();
	window.scrollBy(0, -70);
  }
	
  function unnilItemOfInput(input) {
    var item = getItemOfInput(input);
	if (xmlType(item) != XMLsimpleType) return;
	if (xmlType(item.parentNode) == XMLsimpleContent) item = item.parentNode; 
	isNil(item, true);
  }
  
  function isNil(item, remove) {
    if (isSimpleWithAttribute(item)) return isNil(item.parentNode, remove);
    var itemType = xmlType(item);
	if (itemType < XMLsimpleType) return false;
	var nilVal = document.preference.xsiPrefix;
	if (!nilVal) nilVal = 'xsi:';
	nilVal = '@' + nilVal + 'nil';
	var isSimpleContent = (xmlType(item)==XMLsimpleContent);
    var parentNode = (isSimpleContent)?item:getChildByTagNames(item, ['FIELDSET','DIV','SPAN']);
	if (!parentNode) return false;
    var nodeList = parentNode.childNodes;
    for (var j=0;j<nodeList.length;j++) {
	  var node = nodeList[j];
	  var iTag = node.tagName;
      if ( iTag == 'INPUT' ) {
	    if ( node.name == nilVal ) {
		  if (remove) parentNode.removeChild(node); 
		  return true;
		}
	  } else if ( iTag == 'DIV' || iTag == 'SPAN' ) { 
	    if (!isSimpleContent) return false;
		if (node.className == 'XMLattribute') return false;
	  }
    }
	return false;
  }
  
  function verifyElm(item) {
    function verifyInputItem(node, idInfo) {
	  if (xmlType(node) == XMLanonymous) return true;
	  var error, metaElm;
	  var nilled = isNil(node);
	  var input = getInputOfItem(node);
      if (nilled) {
		metaElm = getMetaElement(node);
		if (metaElm && !metaElm['#ni']) {
		  error = getErrorElementName(node) + ' is nil but it is not nilable'
		} else if (input) {
		  if (input.value) 
		    error = getErrorElementName(node) + ' should be nil but it has value ' + doubleQuote(input.value);
		}
      } else {
	    if (input) {
	      error = verifyInputField(input, idInfo);
		  if (error) {
		    metaElm = getMetaElement(node);
		    if (metaElm) {
	  	  	   var typeInfo = getTypeInfo(getErrorElementName(node), metaElm);
			   if (typeInfo) {
			     error += "\nAccording to the schema, " + typeInfo;
			   }
		    }
		  }
		}
	  }
	  if (error) {
		revealElm(node);
		if (!confirm(error)) return false;
	  }
	  return true;
	}
	
    function verifyElement(node, idInfo) {
	  var childList, error;
	  var nodeType = xmlType(node);
	  if (nodeType > XMLsimpleType) { 
	    childList = getXMLchildren(node);
	  	error = checkTagSequence(node, childList, isNil(node));
	  	if (error) {
	      revealElm(node);
	  	  if (!confirm(error+'.')) return false;
	  	}
	  	if (nodeType == XMLsimpleContent) { 
		  childList = node.childNodes;
		} else {
	      childList = getXMLchildren(node, true); // include attribute
		}
	  	if (!childList) return true;
	  	for (var i=0;i<childList.length;i++) {
	      var childNode = childList[i];
		  nodeType = xmlType(childNode);
		  if (nodeType > XMLsimpleType) {
		    if (!verifyElement(childNode, idInfo)) return false;
		  } else if (nodeType) {
		    if (!verifyInputItem(childNode, idInfo)) return false;
		  }
		}
	  } else if (nodeType) {
		return verifyInputItem(node, idInfo);
	  }
	  return true;
	}

	var idInfo = null;
	if (getRoot() == item) {
	  idInfo = new Array(new Object(), new Object());
	}
	selectXMLform();
    if (!verifyElement(item, idInfo)) return false;
	if (idInfo) {
	  var missing = '';
	  var errorCount = 0;
	  for (var x in idInfo[1]) {
	    missing += doubleQuote(x) + ' ';
		errorCount++;
	  }
	  if (errorCount) {
	    alert('ID ' + missing + (errorCount>1 ? 'are' : 'is') + ' missing.');
		return false;
	  }
	}
	return true; 
  }
	
  function getRealName(input) {
    return input.name.split(',')[0];
  }
	
  function collectEnclosedInput(item) {
    function appendCollectionToArray(a, c) { // would concat work?
	  for (var i=0;i<c.length;i++) {
	    a.push(c[i]);
	  }
	  return a;
	}
	
	var result = new Array();
	var inputs = item.getElementsByTagName('input');
	var first = null;
	for (var i=0;i< inputs.length;i++) {
	  var elm = inputs[i];
	  if (elm.type == 'hidden') continue;
	  // if radio button, use the checked one as input
	  // the problem is none in family is checked, we would pick first in family
	  if (elm.type == 'radio') {
	    if (first) {
		  if (first.parentNode != elm.parentNode) {
		    if (!first.checked) result.push(first); // none checked, use first
		  	first = elm;
		  } 
		} else 
		  first = elm;
		if (elm.checked) 
		  first = elm 
		else 
		  continue;
	  }
	  result.push(elm);
	}
	if (first && !first.checked) result.push(first); // none checked, use first
	appendCollectionToArray( result, item.getElementsByTagName('textarea'));
	appendCollectionToArray( result, item.getElementsByTagName('select'));
	return result;
  }
  
  function getInputOfItem(item) {
    var list = item.getElementsByTagName('input');
	if (list.length) {
	  var radio = null;
	  for (var i=0;i<list.length;i++) {
	    var node = list[i];
		if (node.type == 'radio') {
		  if (node.checked) return node;
		  if (!radio) radio = node;
		} else if (node.type != 'hidden') {
		  return node;
		}
	  }
	  if (radio) return radio;
	}
	list = item.getElementsByTagName('textarea');
	if (list.length) return list[0];
	list = item.getElementsByTagName('select');
	if (list.length) return list[0];
	return null;
  }
  
  function getItemOfInput(input) {
  	return input.parentNode.parentNode;
  }
	
  function getInputValue(input) {
    if (input.tagName == 'INPUT' && input.type == 'radio' && !input.checked) return '';
	return input.value;
  }
	
  function collectValue(item) {
    function pushUnique(a, v) {
	  if ((v != '') && indexOfItemInArray(a, v) == -1) a.push(v);
	  return a;
	}
		
    function addToArray(x) {
	  if (xmlType(x) > XMLsimpleContent) return true;
	  var input = getInputOfItem(x);
	  if (input.tagName == 'SELECT') {
	    // for select we take every value in the options
		var options = input.options;
		for (var i=0;i< options.length;i++) {
		  pushUnique( result, options[i].value);
		}
	  } else if (input.tagName == 'INPUT' && input.type == 'radio') {
	    var list = x.getElementsByTagName('input');
		for (var j=0;j<list.length;j++) {
		  input = list[j];
		  if (input.type == 'radio') pushUnique( result, input.value);
		}
	  } else {
	    pushUnique( result, input.value);
	  }
	  return true;
	}
	
	var enumeration = getItemMetaData(item, '#em');
	if (enumeration) {
	   return enumeration;
	}
	var result = new Array();
	checkEachElement('', item, addToArray);
	return result;
  }
	
  function longestItemSize(values) {
    var result = 0;
	for (var i=0;i<values.length;i++) {
	  if (values[i].length > result) result = values[i].length;
	}
	return result;
  }
  
  function clearExtraFields(input) {
    var parent = input.parentNode;
	var nodeList = parent.childNodes;
	for (var i=nodeList.length-1;i>=0;i--) {
	  var node = nodeList[i];
	  if (node.tagName == 'LABEL') continue;
	  parent.removeChild(node);
	}
	return parent;
  }

  function becomeTextareaElm(item) {
    function makeTextarea(x) {
	  if (x.tagName != 'TEXTAREA') {
	    var nilled = isNil(getItemOfInput(x));
	    var htmlStr = '<textarea row="3" cols="70" onchange="textChanged(this);"></textarea>';
		if (nilled) htmlStr.replace(/textChanged/, 'unnilIfChanged');
	    var node = htmlToNode(htmlStr);
		copyTextAttribute(x, node);
		var parent = clearExtraFields(x);
		parent.appendChild(htmlToNode('<br/>'));
		parent.appendChild(node);
		if (nilled) nilElm(getItemOfInput(node));
	  }
	}
		
	checkEachNode(collectEnclosedInput(item), makeTextarea);
	return true;
  }
	
  function becomeTextfieldElm(item) {
    function makeTextfield(x) {
	  if (x.tagName == 'INPUT') {
	    if (x.type == 'text') return true; // already text, no need to do it
	  }
	  var nilled = isNil(getItemOfInput(x));
	  var htmlStr = '<input type="text" onchange="textChanged(this);"/>';
	  if (nilled) htmlStr.replace(/textChanged/, 'unnilIfChanged');
	  var node = htmlToNode(htmlStr);
	  copyTextAttribute(x, node);
	  if (node.value.length > 20) node.size = 60;
	  clearExtraFields(x).appendChild(node);
	  if (nilled) nilElm(getItemOfInput(node));
	}
	checkEachNode(collectEnclosedInput(item), makeTextfield);
	return true;
  }
	
  function becomeSelectListElm(item, valueList) {
    if (xmlType(item) > XMLsimpleContent) return true;
	var nilled = isNil(item);
	var node = htmlToNode ('<select size="1" onchange="noUndefined(this);"></select>');
    var input = getInputOfItem(item);
	var val = getInputValue(input);
	node.className = input.className;
	node.name = getRealName(input);
	var options = node.options;
	var index = indexOfItemInArray(valueList, val);
	if (index == -1) {
	  options[0] = new Option('**Undefined**', '', false, false);
	  index = 0;
	}
	for (var i=0;i<valueList.length;i++) {
	  val = valueList[i];
	  options[options.length] = new Option(val, val, false, false);
	}
	node.selectedIndex = index;
	clearExtraFields(input).appendChild(node);
	if (nilled) nilElm(item);
	return true;
  }
  
  function removeNoRadio(input) {
	unnilItemOfInput(select);
    var nodeList = input.parentNode.childNodes;
    for (var i=0;i<nodeList.length;i++) {
      var node = nodeList[i];
      if (node.tagName == 'INPUT') {
	    if (node.type == 'hidden' && node.value == '') {
          input.parentNode.removeChild(node);
		}
	  }
	}
	input.parentNode.innerHTML = input.parentNode.innerHTML.replace(/removeNoRadio\(this\)/g, 'radioClicked(this)');
  }
  
  function radioClicked(input) {
  }
  
  function becomeRadioButtonElm(item, valueList) {
    if (xmlType(item) > XMLsimpleContent) return true;
 	var nilled = isNil(item);
    var input = getInputOfItem(item);
	var index = indexOfItemInArray(valueList, getInputValue(input));
	var groupName = getRealName(input) + ',' + document.preference.radioIndex++;
	var cName = input.className;
	var parent = clearExtraFields(input);
	var total = 0;
	var i;
	for (i=0;i<valueList.length;i++) {
	  total += valueList[i].length;
	  if (total > 80) break;
	}
	var changeFunct = 'radioClicked';
	for (i=0;i<valueList.length;i++) {
	  if (total > 80) parent.appendChild(htmlToNode('<br/>'));
	  var node = htmlToNode ('<input type="radio" onchange="radioClicked(this);"/>');
	  parent.appendChild(node);
	  node.className = cName;
	  node.name = groupName;
	  node.value = valueList[i];
	  if (i == index) node.checked = true; // IE needs node to be in document before checked is set
	  parent.appendChild(document.createTextNode(valueList[i]));
	}
	if (nilled) {
	  nilElm(item);
	} else if (index < 0) {
	  clearElm(item);
	}
	return true;
  }
  
  function menuChosen(selectObj) {
    var menuCommand = selectObj.value;
    selectObj.selectedIndex = 0;
    selectObj.blur();
    var multiple = document.menuForm.multiple.checked;
    document.menuForm.multiple.checked = false;
//	document.body.style.cursor = 'wait';
//document.styleSheets[0].cssRules[0].style.cursor = 'wait';
    if (menuCommand.charAt(0) != '-') {
      eval(menuCommand+"(" + multiple + ");");
    }
//document.styleSheets[0].cssRules[0].style.cursor = 'default';
//	document.body.style.cursor = 'default';
    return false;
  }
	
  function askForXMLtag(promptStr) {
    var errorStr = '';
    while (true) {
      var promptResult = prompt(promptStr + errorStr, '');
      if (promptResult == null) {
        return null;
	  } else {
	  	var valueObj = new makeValueObj(promptResult);
	  	if (!checkValidType(valueObj, null, '#Name')) {
		  return valueObj.value;
	  	} else {
	      errorStr = "\n" + '"' + promptResult +'" is not a valid name, try again.';
	  	}
	  }
	}
  }
  
  function askForXMLnames(promptStr) {
    var errorStr = '';
	var str = '';
    while (true) {
      var promptResult = prompt(promptStr+errorStr, str);
      if (promptResult == null) {
        return null;
      } else {
        if (promptResult == '') return [];
		var rst = checkValidList(new makeValueObj(promptResult), null, '#Name');
      	if (typeof(rst) == 'string') {
          errorStr = "\n" + rst + ' not valid XML name, try again';
		  str = promptResult;
		} else {
		  return rst;
		}
      }
    }
  }
  
  function pickNamesFromList(lst, promptStr) {
    if (lst.length == 0) return [];
    var errorStr = '';
    while (true) {
      var promptResult = prompt(promptStr+errorStr, lst.join(' '));
      if (promptResult == null) {
        return null;
      } else {
        if (promptResult == '') return [];
        var rst = promptResult.split(' ');
        errorStr = '';
        for (var i=rst.length-1;i>=0;i--) {
          var name = rst[i];
          if (name.charAt[0] == ' ') {
            rst.splice(i,1);
          } else {
            var inList = false;
            for (var j=0;j<lst.length;j++) {
              if (name == lst[j]) {
                inList = true;
                break;
              }
            }
            if (!inList) {
              if (errorStr) {
                errorStr = name;
              } else {
                errorStr += ' ' + name;
              }
            }
          }
        }
        if (!errorStr) return rst;
        errorStr = "\n" + errorStr + ' not in the list, try again';
      }
    }
  }
  
  function makeElementChosen(selectObj) {
    function followSchema() {
	  if (document.preference.obeySchema) {
	    alert('You cannot make anything that is not already defined in the schema');
		return true;
	  }
	  return false;
	}
		
    var menuCommand = selectObj.value;
    selectObj.selectedIndex = 0;
    selectObj.blur();
    if (menuCommand == 'XMLattribute') {
	  if (followSchema()) return false;
      var newAttrib = askForXMLtag('Please enter the name of the attribute that you want to create');
      if (newAttrib) {
        document.xmlForm.scrap = getPrototype('@'+newAttrib);
        addToElementsMenu('@'+newAttrib);
      }
    } else if (menuCommand == 'XMLsimpleContent' || menuCommand == 'XMLcomplexContent') {
	  if (followSchema()) return false;
      var newElement = askForXMLtag('Please enter the name of the element that you want to create');
	  if (newElement) {
	    var sameAs = existsInElementsMenu(newElement);
		if (sameAs && sameAs.charAt(0) == '@') {
		  sameAs = null; // it is OK to have name as attribute
		}
		if (sameAs) {
		  newElement = sameAs;
		} else {
		  if (menuCommand == 'XMLsimpleContent') { 
		    var attributes = askAboutAttributes(newElement);
			if (attributes == null) return;
			if (attributes.length == 0) {
			  newElement = '!' + newElement;
			} else {
			  updateSchema(newElement, makeRegSchema(attributes, ['#string']));
			  newElement = '#' + newElement;
			  while (attributes.length) {
			    addToElementsMenu('@' + attributes.shift());
			  }
			}
			addToElementsMenu(newElement, 'XMLattribute');
		  } else { // complex content, we need child elements
		    if (!collectComplexContentInfo(newElement)) return false;
			newElement = '#' + newElement;
		  }
		}
		document.xmlForm.scrap = makeElementFromMenu(newElement);
	  }
	} else {
	  document.xmlForm.scrap = makeElementFromMenu(menuCommand);
	}
	return false;
  }
  
  function collectComplexContentInfo(element) {
    var complexStuff = [element];
	var nonComplex = new Array();
	var unknown = new Array();
	var tbdList = new Array(); // list of elements to be written to schema
	var attributeList = new Array();
	var newElement, attributes, attributesArray;
	while (complexStuff.length) {
	  while (complexStuff.length) {
	    newElement = complexStuff.shift();
		attributes = askAboutAttributes(newElement);
		if (attributes == null) return false;
		if (attributes) attributeList = attributeList.concat(attributes);
		var children = askForXMLnames('Enter all the child elements of the element "' + newElement + "\"\n" +
										"The child names should be separated by a space\n" +
										"Leave the field empty if there is no child element\n" +
										'Hit cancel button only if you do not want to stop creating the new element');
		if (children == null) return false;
		tbdList.push(Array(newElement, makeRegSchema(attributes, children)));
		var found = false;
		for (var i=0;i<children.length;i++) {
		  var childElement = children[i];
		  var childType = existsInElementsMenu(childElement);
		  if (childType && childType.charAt(0) != '@') break; // already in the schema
		  for (var j=0;j<tbdList.length;j++) {
		    if (childElement == tbdList[j][0]) {
			  found = true;
			  break; // will be in the schema soon
			}
		  }
		  if (!found) {
		    for (var n=0;j<unknown.length;n++) {
			  if (childElement == unknown[n]) {
			  found = true;
			  break; // we already know that we need to find out more
			  }
			}
		  }
		  if (!found) unknown.push(childElement); // first time we encounter this, put it in unknow list
		}
	  }
	  var complexChildren = pickNamesFromList(unknown, "We do not know about the following elements\n" +
					"Please return those that are complex element with attributes and child elements but no text value\n" +
				"Hit cancel button only if you don't cancel the whole operation");
	  if (complexChildren == null) return false;
	  if (complexChildren.length) {
	    subtractFromArray(unknown, complexChildren); // now we know they are complex content, remove from unknown
	    complexStuff = complexStuff.concat(complexChildren); // and add them to the complex content list
	  }
	  if (unknown.length) {
	    nonComplex = nonComplex.concat(unknown); // the rest go to the non complex list
	  }
	  unknown = []; // unknown has be divded up by complex or non-complex, so nothing left
	}
	// now find out which of the non-complex have attributes
	var hasAttributes = pickNamesFromList(nonComplex, "The following elements have text value and non child elements\n" 				+ "Please return those that have attributes\n" +
					"Hit cancel button only if you don't cancel the whole operation");
	if (hasAttributes == null) return false;
	if (hasAttributes.length) {
	  subtractFromArray(nonComplex, hasAttributes); // only thing left in noncomplex should be simple type
	  while (hasAttributes.length) {
	    newElement = hasAttributes.shift();
	  	attributes = askAboutAttributes(newElement);
	  	if (attributes == null) return false;
	  	if (attributes.length) attributeList = attributeList.concat(attributes);
	  	tbdList.push(Array(newElement, makeRegSchema(attributes,['#string'])));
	  }
	}
	// now put tbd list up to the menu and schema
	while (tbdList.length) {
	  var schemaArray = tbdList.shift();
	  newElement = schemaArray[0];
	  updateSchema(newElement, schemaArray[1]);
	  var placeBefore = schemaArray[1].indexOf('<#string>') < 0 ? 'XMLsimpleContent' : 'XMLattribute';
	  addToElementsMenu('#' + newElement, placeBefore);
	}
	while (nonComplex.length) {
	  newElement = nonComplex.shift();
	  addToElementsMenu('!' + newElement, 'XMLattribute');
	}
	while (attributeList.length) {
	  newElement = attributeList.shift();
	  addToElementsMenu('@' + newElement);
	}
	return true;
  }
  
  function makeRegSchema(attributes, children) {
    var rst = '';
	if (attributes.length) rst = '(<@' + attributes.join('>)(<@') + '>)';
	if (children.length) rst += '(<' + children.join('>)(<') + '>)';
	return rst;
  }
  
  function askAboutAttributes(element) {
    return askForXMLnames('Enter all the attributes of the element "' + element + "\"\n" +
		               "The attributs names should be separated by a space\n" +
			           "Leave the field empty if there is no attribute\n" +
			           'Hit cancel button only if you do not want to stop creating the new element');
  }
  
  function makeElementFromMenu(menuValue) {
	var elementType = menuValue.charAt(0);
    if (elementType != '#') {
	  return getPrototype(menuValue);
	} else {
	  return makeKnownElement(menuValue.substr(1));
	}
  }
  
  function makeKnownElement(name, metaInfo) {
    var elementStack = new Array();
	if (!metaInfo) metaInfo = guessMetaInfo(name);
	if (!metaInfo) return null;
	return makeElementsWithMetaInfo(elementStack, name, metaInfo);
  }
  
  function makeElementsWithMetaInfo(elementStack, name, metaInfo) {
    for (var i=0;i<elementStack.length;i++) {
      if (elementStack[i] == name) return null; // avoid inifnite recursion
    }
	// TBD : we need a context fo find the right element and schema
	var schema;
	if (metaInfo) schema = metaInfo['#cm'];
    if (!schema) schema = getSchema(name);
    if (schema) schema = expandSchema(schema);
    elementStack.push(name);
    var result = null;
    if (schema != undefined) {
      if (schema.indexOf('<#string>') >= 0  || schema.indexOf('<.*?>') >= 0) {
        result = makeElementWithAttribute(elementStack, name, schema, metaInfo);
      } else {
        result = makeComplexContent(elementStack, name, schema, metaInfo);
      }
    } else {
      result = getPrototype( '!' + name ); // just a simple element
    }
    elementStack.pop();
    return result; 
  }
  
  function makeChildAndAttribute(elementStack, parentName, container, before, schema, metaInfo ) {
	var results = schema.match(/<.*?>/g);
	if (!results) return;
	var node;
	for (var i=0;i<results.length;i++) {
	  var tag = results[i].substr(1,results[i].length-2);
	  if (tag.charAt(0) == '@') { // it is an attribute
	  	node = getPrototype(tag);
		var defValue = getMetaDataByPath([parentName,tag], '#df');
		if (defValue) {
		   // we know it is input is either text field or area
		   getInputOfItem(node).value = defValue;
		}
	  	var options = getMetaDataByPath([parentName,tag], '#em');
		if (options) {
		  becomeSelectListElm(node, options);
		}
	  } else if (tag == '#string') {
// alert('TBD: what should we do if tag is #string');
	  } else {
	  	var childMetaInfo = metaInfo[tag];
		if (!childMetaInfo) {
		  var fullpath = metaInfo['#ph'] ? metaInfo['#ph'] + tag : tag;
		  childMetaInfo = document.schema.content[fullpath];
		}
	  	node = makeElementsWithMetaInfo(elementStack, tag, childMetaInfo);
	  }
	  if (node) container.insertBefore(node, before);
	}
  }
  
  function makeElementWithAttribute(elementStack, name, schema, metaInfo) {
    var container = getPrototype('$');
	var node = getPrototype('!' + name);
	if (node) {
	   container.appendChild(node);
	} else {
	  return null;
	}
	makeChildAndAttribute(elementStack, name, container, null, schema, metaInfo);
	return container; 
  }
  
  function makeComplexContent(elementStack, name, schema, metaInfo) {
    var container = getPrototype('#' + name);
	makeChildAndAttribute(elementStack, name, container.firstChild, container.firstChild.lastChild, schema, metaInfo); 
	return container; 
  }
  
  function expandSchema (schema) {
    function replaceRepeatIndex (match, tag, repeatIndex) {
	  replaced = true;
	  return repeatElements(tag, repeatIndex);
	}

	function replaceGroup (match, tag, repeatIndex, option) {
	  if (tag.indexOf('|') != -1) {
	    tag = pickFromChoice(tag);
	  }
	  if (repeatIndex) {
	    tag = repeatElements(tag, repeatIndex);
	  } else if (document.preference.isLargeSchema) {
//	    if (option == '?' || option == '*') tag = '';
	    if (option == '?') tag = '';
	  }
	  replaced = true;
	  return tag;
	}

	function pickFromChoice(str) {
//	  str = str.replace(/^\|+/, '');
	  str = str.replace(/\|{2,}/g, '|').replace(/^\|/, '').replace(/\|$/, '');
//	  return str.split('|')[0];
      var choices = str.split('|');
	  return choices[Math.round(Math.random()*(choices.length-1))];
	}

	function repeatElements(tag, repeatIndex) {
	  var repeatCount = repeatIndex.split(',')[0];
  	  if (!repeatCount) repeatCount = 1;
  	  var seq = tag;
  	  for (;repeatCount>1;repeatCount--) {
	    seq += tag;
	  }
  	  return seq;
	}

	if (!schema) return schema;
	if (schema == '(<.*?>)*') return '';
	schema = schema.replace(/\(</g, '<').replace(/>\)/g, '>');	
	var replaced;
	// TBD : do we need another loop ?
	do {
	  replaced = false;
	  schema = schema.replace(/(<[^>]*?>)\)\{(.*?)/, replaceRepeatIndex); // <a>{} => <a><a>
	} while(replaced);
	if (document.preference.isLargeSchema) {
	  schema = schema.replace(/<[^>]*?>[*?]/g, ''); // <a>* => . <a>? => 
	  schema = schema.replace(/(<[^>]*?>)+?/g, "$1"); // <a>* => <a>. <a>+ => <a>. <a>? => <a>
	} else {
	  schema = schema.replace(/(<[^>]*?>)[*+?]?/g, "$1"); // <a>* => <a>. <a>+ => <a>. <a>? => <a>
	}
	do {
	  replaced = false;
	  schema = schema.replace(/\(\|*\)/g, ''); // TBD : why do we need this ?
	  schema = schema.replace(/\(([^\(^\)]*?)\)(?:\{(.*?)|([*+?]?))/, replaceGroup); // (<a><b>)* or (<a><b>){}
    } while (replaced);
    if (schema.indexOf('|') != -1) schema = pickFromChoice(schema); // TBD : is this necessary ?
  	return schema;
  }

  function existsInElementsMenu(name) {
    var select = document.menuForm.elementsMenu;
	var options = select.options;
	var i;
	for (i=0;i<options.length;i++) {
	  var optionValue = options[i].value;
	  if (name == optionValue.substr(1)) return optionValue; // already there, no need to add
	}
	return null;
  }
  
  function addToElementsMenu(optionValue, before) {
    var elementType = optionValue.charAt(0);
	var elementName = optionValue.substr(1);
	if (elementType == '!' && !document.schema.content[elementName]) { 
	  setSchema(elementName, {'#dt':'#string'});  
	} else if (elementType == '@' && !document.schema.content[optionValue]) {
	  setSchema(optionValue, {'#dt':'#string'});  
	}
    var select = document.menuForm.elementsMenu;
	var where = before ? indexOfValueInOptions(select.options,before)-1: -1;
	addOptionToSelect(select, elementName, optionValue, where);
  }
  
  function getDisplayName(name) {
    function adjustCase (word, state, toUpper) {
      if (state) {
	  	var firstChar = word.charAt(0);
		var theRest = word.substr(1);
		firstChar = toUpper ? firstChar.toUpperCase() : firstChar.toLowerCase();
        word = firstChar + theRest;
      }
	  return word;
	}
	
	if (name.charAt(0) == '@') name = name.substr(1);
	if (document.preference.breaktag == 0) return name;
	var newName = name;
	var charLen = name.length;
	if (charLen > 1) {
	  if (name.indexOf('_') >- 0) {
	    newName = name.replace(/_/g, ' ');
	  } else if (name.indexOf('\.') >- 0) {
	    newName = name.replace(/\./g, ' ');
	  } else if (name.indexOf('-') >- 0) {
	    newName = name.replace(/-/g, ' ');
	  } else {
	    var useUpper = name.charAt(0).search(/[A-Z]/) == 0;
		var newState = useUpper ? 0 : 1;
		var curState;
		var wordBegin = 0;
		var newWord = '';
		newName = '';
		for (var i=1;i<charLen;i++) {
		  curState = newState;
		  var curChar = name.charAt(i);
		  if (curChar.search(/[A-Z]/) == 0) {
		    if (curState) {
			  newWord = name.substr(wordBegin,i-wordBegin);
			  wordBegin = i;
			  newState = 0;
			}
		  } else if (curChar.search(/[a-z]/) == 0) {
		    if (curState) {
			  if (curState == 2) {
			    newWord = name.substr(wordBegin,i-wordBegin);
			    wordBegin = i;
			  }
			} else {
			  newWord = name.substr(wordBegin,i-wordBegin-1);
			  wordBegin = i-1;
			}
			newState = 1;
		  } else {
		    newState = 2;
		  }
		  if (newWord) {
            newName += adjustCase(newWord, curState, useUpper) + ' ';
            newWord = '';
		  }
		}
        newName += adjustCase(name.substr(wordBegin), curState, useUpper);
	  }
	}
	return newName;
  }
	
  function getPrototype( tagName ) {
    var elementType = tagName.charAt(0);
	if (elementType != '@') tagName = tagName.substr(1);
	var htmlStr = getElementPrototype(elementType);
  	tagName = tagName.replace(/.*,/, '');
	return htmlToNode( htmlStr.replace(/!tn!/g, tagName).replace(/!dn!/g, getDisplayName(tagName)) );
  }
  
  function getElementPrototype( elementType ) {
    switch ( elementType) {
	  case "#":
	    return '<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);"><fieldset class="!tn!"><legend>- !dn!</legend><input type="hidden" value="!tn!" name=".tg"><input type="hidden" value="/!tn!" name=".tg"></fieldset></div>';
	  case "$":
        return '<div class="XMLsimpleContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);"></div>';
	  case "!":
        return '<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);"><span class="!tn!"><label>!dn!: </label><input type="text" class="!tn!" name="!tn!" value="" onfocus="focusGained(this)" onchange="nilIfChanged(this)"/></span><br/></span>';
	  case "@":
        return '<span class="XMLattribute" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);"><span class="!tn!"><label>!dn!: </label><input type="text" class="!tn!" name="!tn!" value="" onfocus="focusGained(this)" onchange="textChanged(this)"/></span><br/></span>';
    }
	return null;
  }
    
  // walking XML tree by walking HTML tree
  
  function getChildByTagNames(item, names) {
//    if (!(item.hasChildNodes())) return null; // not supported by IE
    if (!item.childNodes || !item.childNodes.length) return null;
    var nodeList = item.childNodes;
    for (var i=0;i<nodeList.length;i++) {
      var node = nodeList[i];
      var nodeTag = node.tagName;
      if (nodeTag) {
        for (var j=0; j<names.length; j++) {
          if (nodeTag == names[j]) return node;
        }
      }
    }
    return null;
  }

  function doToEachChild(item, func, param1, param2 ) {
    var nodeList = item.childNodes;
    for (var i=0;i<nodeList.length;i++) {
      var node = nodeList[i];
      if (node.nodeType != 1) continue;
      if (node.tagName == 'DEL') {
        node = node.firstChild;
      }
      if (xmlType(node)) {
        func(node, param1, param2);
      }
    }
  }
  
  function getXMLelementName(xmlNode) {
    var nodetype = xmlType(xmlNode);
    if (!nodetype) return '';
    if (nodetype == XMLanonymous) return '#string';
    if (nodetype == XMLsimpleContent) xmlNode = getChildByTagNames(xmlNode, ['DIV','SPAN']);
    return getChildByTagNames(xmlNode, ['FIELDSET','DIV','SPAN']).className;
  }
  
  function getXMLparent(xmlNode) {
    if (isRoot(xmlNode)) return null;
    var parent = xmlNode.parentNode;
    if (parent.tagName == 'DEL') parent = parent.parentNode;
    if (xmlType(parent) == XMLsimpleContent) {
      if (xmlType(xmlNode) == XMLattribute) {
        return getChildByTagNames(parent, ['DIV','SPAN']); // ???
      }
      parent = parent.parentNode;
      if (parent.tagName == 'DEL') parent = parent.parentNode;
    }
    return parent.parentNode;
  }
	
  function getXMLchildren(xmlNode, includeAttribute) {
    var nodeType = xmlType(xmlNode);
	if (nodeType <= XMLsimpleContent) return null;
//	var includeType = includeAttribute ? XMLanonymous : XMLsimpleType;
	var result = new Array();
	var container = getChildByTagNames(xmlNode, ['FIELDSET','DIV','SPAN']);
	var nodeList = container.childNodes;
	for (var i=0;i<nodeList.length;i++) {
	  var node = nodeList[i];
	  nodeType = xmlType(node);
//	  if (xmlType(node) >= includeType) {
	  if (nodeType && (includeAttribute || nodeType != XMLattribute)) {
	    result.push(node);
	  }
	}
	return result;
  }
	
  function getNamedXMLchild(xmlNode, name) {
    var nodeType = xmlType(xmlNode);
	if (nodeType < XMLsimpleContent) return null;
	var container;
	if (nodeType == XMLsimpleContent)
	  container = xmlNode
	else
	  container = getChildByTagNames(xmlNode, ['FIELDSET','DIV','SPAN']);
	var nodeList = container.childNodes;
	for (var i=0;i<nodeList.length;i++) {
	  var node = nodeList[i];
	  var nodeType = xmlType(node);
	  if (nodeType) {
	    var nodeName = getXMLelementName(node);
		if (nodeType == XMLattribute) nodeName = '@' + nodeName;
		if (name == nodeName) return node;
	  }
	}
	return null;
  }
	
  function getXMLattributeNames(xmlNode, schema) {
    var nodeType = xmlType(xmlNode);
	if (nodeType < XMLsimpleType) return null;
	var result = new Array();
	var positions = new Array();
	var container;
	switch (nodeType) {
	  case XMLsimpleType:
	    container = xmlNode.parentNode;
		if (xmlType(container) != XMLsimpleContent) return null;
		nodeType = XMLsimpleContent; // now claim to be container
		break;
	  case XMLsimpleContent:
	    container = xmlNode;
	    break;
	  default: 
	    container = getChildByTagNames(xmlNode, ['FIELDSET','DIV','SPAN']);
	}
	var nodeList = container.childNodes;
	for (var i=0;i<nodeList.length;i++) {
	  var node = nodeList[i];
	  var childType = xmlType(node);
	  if (childType >= XMLsimpleType) {
	    if (nodeType == XMLsimpleContent && childType == XMLsimpleType) continue;
		break;
	  } else if (childType == XMLattribute) {
	    var name = '<@' + getXMLelementName(node) + '>';
		if (schema) { // arrange attribute in the order they appear in schema
	      var loc = schema.indexOf(name);
		  var insertAt = positions.length;
		  for (var j=0;j<positions.length;j++) {
		    if (loc < positions[j]) {
			  insertAt = j-1;
			  break;
		    }
	      }
		  result.splice(insertAt,0,name);
		  positions.splice(insertAt,0,loc);
	    } else {
		  result.push(name);
		}
	  }
	}
	return result;
  }
	
  function getXMLprevSibling (xmlNode) {
    var result = xmlNode;
	while ((result = result.previousSibling) != null) {
	  if (xmlType(result)) return result;
	}
	return null;
  }
  
  function getXMLnextSibling (xmlNode) {
    var result = xmlNode;
	while ((result = result.nextSibling) != null) {
	  if (xmlType(result)) return result;
	}
	return null;
  }
  
  function getXMLfirstChild(xmlNode, attributeToo) {
    var nodeType = xmlType(xmlNode);
	if (nodeType < XMLsimpleContent) return null;
	var container;
	if (nodeType == XMLsimpleContent)
	  container = xmlNode
	else
	  container = getChildByTagNames(xmlNode, ['FIELDSET','DIV','SPAN']);
	var nodeList = container.childNodes;
	for (var i=0;i<nodeList.length;i++) {
	  var node = nodeList[i];
	  if (xmlType(node) >= (attributeToo ? XMLanonymous : XMLsimpleType)) {
	    return(node);
	  }
	}
	return null;
  }
	
  function getXMLlastChild(xmlNode, attributeToo) {
    var nodeType = xmlType(xmlNode);
	if (nodeType < XMLsimpleContent) return null;
	var container;
	if (nodeType == XMLsimpleContent)
	  container = xmlNode
	else
	  container = getChildByTagNames(xmlNode, ['FIELDSET','DIV','SPAN']);
	var nodeList = container.childNodes;
	for (var i=nodeList.length-1;i>=0;i--) {
	  var node = nodeList[i];
	  if (xmlType(node) >= (attributeToo ? XMLanonymous : XMLsimpleType)) {
	  return(node);
	  }
	}
	return null;
  }
	
 // end of walking XML tree by walking HTML tree

  function getElementDescription(item) {
    var elemDesc = new Object();
	elemDesc.item = item;
	elemDesc.itemName = getXMLelementName(item);
	var parent = getXMLparent(item);
	if (parent) {
	  if (xmlType(parent) == XMLsimpleContent) {
	    if (xmlType(item) == XMLattribute) {
		  parent = getChildByTagNames(parent, ['DIV','SPAN']);
		} else {
		  parent = getXMLparent(parent);
		}
	  }
	  elemDesc.parentName = getXMLelementName(parent);
	} else {
	  elemDesc.parentName = '';
	}
	return elemDesc;
  }
	
  function checkEachElement(confirmPrompt, proto, func, option) {
    function collectMatchingElement( item, elemDesc, matchingArray) {
	  // we need to collect all the elements in an array first
	  // we don't want to do it on the fly because the operation would affect the xml tree
      var thisItemDesc = getElementDescription(item);
      if ((item != elemDesc.item || confirmPrompt == '')
          && thisItemDesc.itemName == elemDesc.itemName && thisItemDesc.parentName == elemDesc.parentName) {
        matchingArray.push(item);
      }
	  var thisType = xmlType(item);
      if (thisType > XMLsimpleType) {
        var container = item;
        if (thisType == XMLsimpleContent) {
          if (xmlType(elemDesc.item) != XMLattribute) return; // only look for attribute inside complex type
        } else {
          container = getChildByTagNames(item, ['FIELDSET', 'SPAN', 'DIV']);
        }
        doToEachChild(container, collectMatchingElement, elemDesc, matchingArray);
      }
    }
	
    var elemDesc = getElementDescription(proto);
    var matchingArray = new Array();
    if (elemDesc) { // now do it to every matching element
			var thisItem = getChildByTagNames(document.xmlForm, ['DIV']);
      collectMatchingElement( thisItem, elemDesc, matchingArray);
    }
    // first do it to the prototype, if OK do to others
	if (confirmPrompt=='' || (func(proto, option) && matchingArray.length && confirm(confirmPrompt))) {
	  for (var i=0;i<matchingArray.length;i++) {
	    func(matchingArray[i], option);
	  }
    }
  }
	
  function getSelection() {
    var item = xmlSelection;
    if (!item) item = focusField;
    if (!item) alert('Nothing is selected.');
	return item;
  }
  
  function doToSelected(func, multiple, option) {
    var item = getSelection();
    if (!item) {
      return false;
    } else {
      if (multiple) {
        checkEachElement('Now do you want to repeat the operation on similar elements?', item, func, option)
      } else {
        func(item, option);
      }
      return true;
    }
  }
   
  function duplicateSelected(multiple) {
    doToSelected(duplicateElm, multiple);
  }
  
  function copySelected(multiple) {
    doToSelected(copyElm, multiple);
  }

  function cutSelected(multiple) {
    doToSelected(cutElm, multiple);
  }

  function pasteBeforeSelected(multiple) {
    doToSelected(pasteElm, multiple, 'before');
  }

  function pasteAfterSelected(multiple) {
    doToSelected(pasteElm, multiple, 'after');
  }

  function pasteIntoSelected(multiple) {
    doToSelected(pasteElm, multiple, 'into');
  }

  function pasteReplaceSelected(multiple) {
    doToSelected(pasteElm, multiple, 'replace');
  }

  function clearSelected(multiple) {
    doToSelected(clearElm, multiple);
  }
  
  function nilSelected(multiple) {
    doToSelected(nilElm, multiple);
  }
  
  function makeXML() {
	if (outputToWindow()) document.xmlForm.submit();
  }
  
  function expandSelected(multiple) {
    doToSelected(expandElm, multiple);
  }
  
  function collapseSelected(multiple) {
    doToSelected(collapseElm, multiple);
  }
  
  function verifySelected(multiple) {
    doToSelected(verifyElm, multiple);
  }
  
  function becomeTextarea(multiple) {
    doToSelected(becomeTextareaElm, multiple);
  }
  
  function becomeTextfield(multiple) {
    doToSelected(becomeTextfieldElm, multiple);
  }
  
  function becomeChooseOne(multiple, func, warnSize) {
    var item = getSelection();
    if (!item) {
      return false;
    } else {
	  switch (xmlType(item)) {
	    case XMLattribute:
		case XMLsimpleType:
		  var values = collectValue(item);
		  if (values.length == 0) {
		    alert('There are no value to choose from');
		  	return false;
		  }
		  var extraProblem = '';
		  var longest = longestItemSize(values);
		  if (longest > 80) extraProblem = ' some with as many as ' + longest + ' characters, ';
		  if (values.length > warnSize) {
		    if (!confirm('There are ' + values.length + ' choices, ' + extraProblem + 'are you sure you want to do it?')) return false;
		  } else if (extraProblem) {
		  	if (!confirm('We have long strings, ' + extraProblem + 'are you sure you want to do it?')) return false;
		  }
		  doToSelected(func, multiple, values);
		  return true;
		default:
		  alert('You need to do it to a single input field');
		  return false;
	  }
    }
  }
  
  function becomeSelectList(multiple) {
    return becomeChooseOne(multiple, becomeSelectListElm, 30);
  }
  
  function becomeRadioButton(multiple) {
    return becomeChooseOne(multiple, becomeRadioButtonElm, 10);
  }
  
  function showHTML(item) {
    alert(item.innerHTML);
  }
  
  function showElm(item) {
    var parent = getXMLparent(item);
	if (xmlType(parent) == XMLsimpleContent) {
	  if (xmlType(item) == XMLattribute) {
	    parent = getChildByTagNames(parent, ['DIV','SPAN']);
	  } else {
	    parent = getXMLparent(parent);
	  }
	}
	var parentName = parent ? getXMLelementName(parent) : '';
    alert(item + " " + item.className + " " + getXMLelementName(item) + " " + parentName);
  }
  
  function getTypeInfo(name, metaElm) {
    function getTypeInfoFromType(type, derived) {
	  if (!type) return '';
	  if (typeof(type) == 'string') {
	    if (type.substr(0,1) == '#') {
		  var predefined = 'the predefined type ' + doubleQuote(type.substr(1));
		  if (derived) predefined = 'derived from ' + predefined;
		  return predefined;
		}
	  	return getTypeInfoFromType( document.schema.datatype[type], derived );
	  }
	  if (typeof(type) == 'object') {
	    var info;
	    if (!derived) {
	  	  info = type['#dc'];
	  	  if (info) return info;
	    }
	    if (type['#ct'] || type['#pt'] || type['#em'] || type['#lc']) derived = true;
		if (type['#dt'] == '#list') {
		  info = 'a list';
		  var listInfo = getTypeInfoFromType(type['#lt'], false);
		  if (listInfo) info += ' of (' + listInfo + ')';
		} else if (type['#dt'] == '#union') {
		  info = 'a union of (';
		  var unionList = type['#un'];
		  for (var ui=0;ui<unionList.length;ui++) {
		    var unionInfo = getTypeInfoFromType(unionList[ui], false);
			if (!unionInfo) unionInfo = 'some data type';
			if (ui != unionList.length-1) unionInfo += ', ';
			info += unionInfo;
		  }
		  info += ')';
		} else {
	      info = getTypeInfoFromType(type['#dt'], derived);
		}
	    if (!info) return '';
	    if (derived && info.search(/^derived from/) != 0) info = 'derived from ' + info;
	    return info;
	  }
    }

    var info = getTypeInfoFromType(metaElm['#dt'], false);
 	if (info) {
	  if (metaElm['#ni']) info += '. ' + name + ' is nillable';
	  return name + ' data type is ' + info;
	}
	var model = metaElm['#cm'];
	if (model) {
	  var rst = humanReadableRegexp(name, model.replace(/<(?:[^>])*,/g, '<'));
	  if (metaElm['#al']) rst += '. Child elements can be in any order';
	  if (metaElm['#ni']) rst += '. ' + name + ' is nillable';
	  return rst;
	} 
	return null;
  }
	
  function selectedInfo() {
    var item = xmlSelection;
	if (!item) item = focusField;
	var name = item ? getErrorElementName(item) : '';
	var metaElm = item ? getMetaElement(item) : document.schema.content[''];
	var comment = metaElm ? metaElm['#dc'] : '';
	if (!comment) comment = '';
	if (item) {
	  if (isNil(item)) {
	    if (comment) comment += ".\n";
	    comment += name + ' is nil, to edit it run the clear command first.';
	  }
	  if (item && metaElm) {
	    var typeInfo = getTypeInfo(name, metaElm);
	    if (typeInfo) {
	      if (comment) 
		    comment += ".\n" + typeInfo;
	      else 
		    comment = typeInfo;
	    }
	  }
	}
	if (!comment) return false;
	alert(comment + '.');
	selectXMLform(item);
    return true;
  }
 
  function aboutSelected() {
    if (selectedInfo()) return true;
	alert('No help information is available');
	return true;
  }
     
  function helpSelected() {
    aboutSelected();
	event.returnValue = false;
	return false;
  }
     
  function test(multiple) {
    doToSelected(showHTML, multiple);
    if (0) {
      var x = '';
      while (true) {
        x = prompt('to eval', x);
        if (!x) break;
        alert(eval(x));
      }
	}
  }
  
  function sortSelectedKey() {
    function getKeyName(item) {
	  var name = getXMLelementName(item);
	  if (xmlType(item) == XMLattribute) name = '@' + name;
	  return name;
	}
		
	function findRun(candidates, start, type, name, prop) {
	  var next = start;
	  var result = null;
	  while ((next = next[prop]) != null) {
	    if (xmlType(next)) {
		  if (getKeyName(next) == name)
		    candidates.push(next)
		  else
		    break;
		}
	  }
	}
		
	function getXMLValue(item) {
	  if (xmlType(item) > XMLsimpleContent) return null;
	  var input = getInputOfItem(item);
	  return getInputValue(input);
	}
		
    var item = getSelection();
    if (!item) return false;
	var itemType = xmlType(item);
	var parent;
	var path = [getKeyName(item)];
	if (itemType == XMLsimpleType) { 
	  if (isSimpleWithAttribute(item)) {
		parent = item.parentNode;
	  } else
		parent = item;
	} else if (itemType == XMLattribute) {
	  parent = getXMLparent(item);
	  path.push(getKeyName(parent));
	} else
	  return alert('No key has been selected.');
	while (true) {
	  if (isRoot(parent)) return alert('We cannot find anything to sort.');
	  var parentType = xmlType(parent);
	  var parentName = getKeyName(parent);
	  var candidates = new Array();
	  findRun(candidates, parent, parentType, parentName, 'previousSibling');
	  candidates.reverse().push(parent);
	  findRun(candidates, parent, parentType, parentName, 'nextSibling');
	  if (candidates.length > 1) {
	    if (confirm('Are you are trying to sort "' + getKeyName(parent) + '"?')) {
		  var total = candidates.length;
		  var before = candidates[total-1].nextSibling;
		  var sortValues = new Array();
		  var valueIndex = new Object();
		  var missingValue = false;
		  path.reverse();
		  for (var i=0;i<total;i++) {
			var searchItem = candidates[i];
			var curItem = searchItem;
			for (var j=1;j<path.length;j++) {
			  curItem = getNamedXMLchild(curItem, path[j]);
			  if (!curItem) break; // cannot find key
			}
			val = null;
			if (curItem) val = getXMLValue(curItem);
			if (val == null) {
			  missingValue = true;
			  val = '';
			}
			sortValues.push(val);
			if (valueIndex[val]) {
			  valueIndex[val].push(searchItem);
			} else
			  valueIndex[val] = [searchItem];
			}
			if (missingValue && !confirm('There are one or more elements without a key or whose key value is not a simple string, do you still want to sort?')) return false;
			sortValues.sort();
			for (m=0;m<total;m++) {
			  candidates[m] = valueIndex[sortValues[m]].shift();
			}
			var parent = candidates[0].parentNode;
			for (var m=total-1;m>=0;m--) { // reverse disturbs less if alreay in order
			  var toMove = candidates[m];
			  if (toMove.nextSibling != before) {
			    parent.removeChild(toMove);
			  	parent.insertBefore(toMove, before);
			  }
			  before = toMove;
			}
			return true;
		  } else
		    return false;
		} else {
		  parent = getXMLparent(parent);
		  path.push(getKeyName(parent));
		}
	  }
	}
	
  
  function outputToWindow(x) {
	if (!isMoz  && !isSafari && !isKonqueror) return true;
	if (confirm('Mozilla bug 204784 can cause our CGI script to fail. The bug will be fixed in a coming Mozilla release. Safari has the same problem. In the mean time you can continue but the result is likely to be wrong if you made any insertion/deletion. The work around is to take a snap shot after you are done with your editing, and submit from the new snap shot.')) return true;
    return false;
  }
	
  function printNode(targetDoc, node) {
    var i;
	var tag = node.tagName.toLowerCase();
	targetDoc.write('<' + tag);
	var attributes = node.attributes;
//	if (node.hasAttributes()) { // not supported by IE
	if (attributes.length) {
	  if (tag == 'input') {
	    if (node.type == 'text') {
	      if (isIE) {
		    // IE don't considered type and value specified
		    targetDoc.write(' type="text"');
		  } else
		    node.setAttribute('value', markUpCompatiable(node.value));
	    } else if (node.type == 'radio') {
		  if (node.checked)
		    node.setAttribute('checked', 'checked')
		  else
		    node.removeAttribute('checked');
	    }
	    if (isIE) {
		  // IE don't considered type and value specified
		  targetDoc.write(' value="' + markUpCompatiable(node.value) + '"');
	    }
	  } else if (tag == 'textarea')
	    node.setAttribute('value', markUpCompatiable(node.value))
	  else if (tag == 'select') {
	    var options = node.getElementsByTagName('option');
	    for (i=0;i< options.length;i++) {
	      if (i == node.selectedIndex)
		    options[i].setAttribute('selected', 'selected')
		  else
		    options[i].removeAttribute('selected');
	    }
	  } else if (isIE && tag == 'body') {
	    targetDoc.write(' onload="editorSetup();"');
	  } else if (isIE) {
	    if (node.style.display)
		  targetDoc.write(' style="display: ' + node.style.display + ';"');
	  }
	  for (i=0;i<attributes.length;i++) {
	    var attribute = attributes[i];
	    if (attribute.specified)
	    targetDoc.write(' ' + attribute.name + '="' + attribute.value + '"');
	  }
    }
    var childNodes = node.childNodes;
//  if (node.hasChildNodes()) { // not supported by IE
    if (childNodes.length) {
	  if (tag == 'form' || tag == 'select')
	    targetDoc.writeln('>')
	  else
	    targetDoc.write('>');
	  if (tag == 'script' && node.parentNode.tagName == 'FORM') {
	    var scriptContent = childNodes[0].nodeValue;
		var beginOffset = scriptContent.indexOf('// begin preference') + 20;
		var endOffset = scriptContent.indexOf('// end preference');
		scriptContent = scriptContent.substr(0,beginOffset) + makePreferenceScript() + scriptContent.substr(endOffset);
		beginOffset = scriptContent.indexOf('// begin schema') + 16;
    	endOffset = scriptContent.indexOf('// end schema');
		scriptContent = scriptContent.substr(0,beginOffset) + makeSchemaScript() + scriptContent.substr(endOffset);
		targetDoc.writeln(scriptContent +'</script>');
		return;
 	  }
	  for (i=0;i< childNodes.length;i++) {
	    var childNode = childNodes[i];
		if (childNode.nodeType == 1)
		  printNode(targetDoc, childNode)
		else
		  targetDoc.write(childNode.nodeValue);
	  }
	  targetDoc.write('</' + tag + '>');	
	  if (tag == 'span' || tag == 'div' || tag == 'option' || tag == 'select' ) targetDoc.write("\n");
	} else if (tag == 'script') {
	  targetDoc.write('>');
	  if (isIE && node.parentNode.tagName == 'FORM') {
	    targetDoc.writeln("\n<!" + '--');
		targetDoc.writeln('  function setUpPreference() {');
		targetDoc.writeln('    var preference = document.preference;');
		targetDoc.writeln('    // begin preference');
		targetDoc.write(makePreferenceScript());
		targetDoc.writeln('    // end preference');
		targetDoc.writeln("  }\n");
		targetDoc.writeln('  function setUpSchemaInfo() {');
		targetDoc.writeln('    // begin schema');
		targetDoc.write(makeSchemaScript());
		targetDoc.writeln('    // end schema');
		targetDoc.writeln('  }');
		targetDoc.writeln("--" + ">");
	  }
	  targetDoc.writeln('</script>'); // for some reason broswer don't like <script />
	} else if (tag == 'title') {
	  targetDoc.write('>' + document.title + '</title>');
	} else if (tag == 'style') {
	  if (isIE)
	    targetDoc.writeln('>' + document.styleSheets[0].cssText + '</style>')
	  else
	    targetDoc.writeln('></style>');
	} else
	  targetDoc.write(' />');
  }
	
  function snapShot() {
    if (isSafari && !confirm('This does not work with Safari 1.2.1, proceed only if you want to try it on a later version of Safari')) return false;
    selectXMLform(); // deselect it because we don't want the selection bg color
    var targetWindow = window.open();
	var targetDoc = targetWindow.document;
	targetDoc.open('text/html');
	var fakeDoc;
	var useInnerHTML = false; // use innerHTML is much simplier, but hangs when element was duplicated
	if (isIE && !useInnerHTML) {
	// for IE it would be faster to write to a buffer first
	  fakeDoc = new Object();
	  fakeDoc.dataString = new String('');
	  fakeDoc.write = fakeWrite;
	  fakeDoc.writeln = fakeWriteln;
	} else
	  fakeDoc = targetDoc;
	fakeDoc.writeln('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">');
	fakeDoc.writeln("<html>");
	if (isIE  && useInnerHTML) {
	  var docContent = document.getElementsByTagName('html')[0].innerHTML;
	  var beginOffset = docContent.indexOf('// begin preference') + 20;
	  var endOffset = docContent.indexOf('// end preference');
	  targetDoc.write( docContent.substr(0,beginOffset) );
	  targetDoc.write( makePreferenceScript() );
	  beginOffset = docContent.indexOf('// begin schema') + 16;
	  targetDoc.write( docContent.substr(endOffset,beginOffset-endOffset) );
	  docContent = docContent.substr(beginOffset);
	  targetDoc.write( makeSchemaScript() );
	  endOffset = docContent.indexOf('// end schema');
	  docContent = docContent.substr(endOffset);
	  targetDoc.writeln(docContent);
	} else { 
	  // opera doesnot support innerHTML, and Moz innerHTML does not have latest value in form elements
	  // so we have to write it out ourself
	  printNode( fakeDoc, document.getElementsByTagName('head')[0] );
	  printNode( fakeDoc, document.getElementsByTagName('body')[0] );
	}
	fakeDoc.writeln("</html>");
	if (isIE && !useInnerHTML)
	  targetDoc.write(fakeDoc.dataString.toString());
	targetDoc.close();
  }

  function fakeWrite(x) {
    this.dataString = this.dataString.concat(x);
  }

  function fakeWriteln(x) {
    this.dataString = this.dataString.concat(x, "\n");
  }
  
  function verifyRoot() {
	var hasSchema = false;
	for (var name in document.schema.content) {
	  hasSchema = true;
	  break;
	}
	if (hasSchema) verifyElm(getRoot());
  }

  function editorSetup() {
    document.preference = new Object();
	document.schema = new Object();
	document.schema.content = new Object();
	document.schema.datatype = new Object();
	if (setUpSchemaInfo) setUpSchemaInfo();
	if (setUpPreference) setUpPreference();
	verifyRoot();
  }
  
  function verifyInputField(inputField, idInfo) {
	var xmlNode = inputField;
	while (!xmlType(xmlNode)) xmlNode = xmlNode.parentNode;
	return checkValidValue(new makeValueObj(inputField.value), getMetaElement(xmlNode), idInfo);
  }

  function textChanged(inputChanged) {
    var preference = document.preference;
    if (!preference.checkSchema) return;
	var errorStr = verifyInputField(inputChanged);
	if (errorStr) {
	  alert(errorStr);
	  if (preference.obeySchema) {
	    inputChanged.select();
	  	inputChanged.focus();
	  }
	}
  }
  
  function unnilIfChanged(inputChanged) {
	unnilItemOfInput(inputChanged);
	var item = getItemOfInput(inputChanged);
	item.innerHTML = item.innerHTML.replace(/unnilIfChanged\(this\)/, 'textChanged(this)');
	// not needed for IE, what about opera or safari
    var v = inputChanged.value;
	var inputChanged = getInputOfItem(item);
	inputChanged.value = v;
	//
    textChanged(inputChanged);
  }
  
  function showPreference() {
    function makeCheckbox(varName, displayName) {
	  var rst = '<input type="checkbox" name="' + varName + '"';
	  if (document.preference[varName]) rst += 'checked="checked"';
	  rst += ' />' + displayName + '. <br>';
	  return rst; 
	}
	
    var targetWindow = window.open('','Preference','width=400,height=160');
	var targetDoc = targetWindow.document;
	targetDoc.open('text/html');
	targetDoc.write('<title>XML Form Editor Preference</title>');
	targetDoc.write('<form>');
	targetDoc.write(makeCheckbox('checkSchema', 'Check to see if data conforms to schema'));
	targetDoc.write(makeCheckbox('obeySchema', 'Try to disallow data that does not follow the schema'));
	targetDoc.write('<input value="Set Preference" type="button" onclick="if (opener) opener.updatePreference(this.form);" /></form>');
	targetDoc.close();
	targetWindow.focus();
  }
  
  function updatePreference(form) {
    for (var i=0;i<form.elements.length;i++) {
	  if (form.elements[i].type == 'checkbox') {
		document.preference[form.elements[i].name] = form.elements[i].checked;
	  }
	}
  }
	
  function showSchema() {
    var targetWindow = window.open('','Schema','width=600,height=230');
	var targetDoc = targetWindow.document;
	targetDoc.open('text/html');
	targetDoc.write('<title>XML Form Editor Schema</title>');
	targetDoc.write('<form name="generator">');
	targetDoc.write('<textarea name="schema" rows="10" cols="70">' + markUpCompatiable(makeSchemaScript())+ '</textarea>');
	targetDoc.write('<input value="Set Schema" type="button" onclick="if (opener) {var rst=opener.updateSchemaScript(this.form.schema.value);if (rst) {alert(rst)} else {window.close()}}" /></form>');
	targetDoc.close();
	targetWindow.focus();
  }
  
  function updateSchemaScript(script) {
    var saveSchema = document.schema;
	document.schema = new Object();
	document.schema.content = new Object();
	document.schema.datatype = new Object();
    try {
	  eval(script);
	  return '';
	} catch(err) {
	  document.schema = saveSchema;
	  return err;
	}
  }

  function showProp(x) {
    var rst = '';
    for (var p in x) {
	  var val = x[p];
	  if (typeof(val) == 'object') {
	    val = '{' + showProp(val) + '}';
	  }
      rst += p + ':' + val + '\n';
    }
	return rst;
  }
  
//-->
