function padding(string, number){
	var zeros = '';
	if(string.length != number){
		for(var i=0, length = number - string.length; i < length; i++)
			zeros += '0';
	}
	return zeros+string;
}
function stringToHex(str){
	var hex = '';
	for (var i = 0, sum, sub;i<str.length;i+=4){
		sum = 0;
		sub = str.substring(i,i+4);
		for(var j = 0;j < sub.length; j++)
			sum += sub.charCodeAt(j) << (sub.length-j-1)*8;
		hex += padding(sum.toString(16),2*sub.length);
	}
	return hex;
}
function hexToString(hex){
	var str = '';
	for(var i = 0;i <hex.length ; i+=2){
		str += String.fromCharCode(parseInt(hex.substring(i,i+2),16));
	}
	return str;
}