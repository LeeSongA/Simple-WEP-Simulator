function padding(string, number){
	var zeros = '';
	if(string.length != number){
		for(var i=0, length = number - string.length; i < length; i++)
			zeros += '0';
	}
	return zeros+string;
}
function stringToHex(str){
	var sum = 0;
	for(var i = 0;i < str.length; i++)
		sum += str.charCodeAt(i) << (str.length-i-1)*8;
	return padding(sum.toString(16),2*str.length);
}
function hexToString(hex){
	var str = '';
	for(var i = 0;i <hex.length ; i+=2)
		str += String.fromCharCode(parseInt(hex.substring(i,i+2),16));
	return str;
}