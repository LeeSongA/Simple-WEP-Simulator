/* refer: https://stackoverflow.com/questions/18638900/javascript-crc32 */
function makeCrcTable(){
    	var c;
    	var table = [];
    	for(var i =0; i < 256; i++){
        	c = i;
        	for(var k =0; k < 8; k++)
            		c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        	table[i] = c;
    	}
    	return table;
}

function makeCheckSum(){
    	var crc = 0 ^ (-1);
	var message = $('.input_message').val();
    	for (var i = 0; i < message.length; i++ )
        	crc = (crc >>> 8) ^ crcTable[(crc ^ message.charCodeAt(i)) & 0xFF];
	crc32_16 = ((crc ^ (-1)) >>> 0).toString(16);
	crc32_16 = padding(crc32_16,8);
	plainText_16 = stringToHex(message)+crc32_16;
	$('.text_crc32').html(crc32_16);
	$('.text_plain').html(plainText_16);		
}
/* refer: https://stackoverflow.com/questions/18638900/javascript-crc32 */

function makeKeyString(str, seed){
	keyString_16 = '';
	var S = [], K=[];
	for (var i = 0; i < 256; i++){
		S[i] = i;
		K[i] = seed.charCodeAt(i % seed.length);
	}
	for (var i = 0, j = 0, temp; i < 256; i++){
		j = (j + S[i] + K[i]) % 256;
		temp = S[i];
		S[i] = S[j];
		S[j] = temp;	
	}
	for (var i = 0, j = 0, k = 0, temp; i < str.length / 2; i++){
		j = (j + i) % 256;
		k = (k + S[j]) % 256;
		temp = S[j];
		S[j] = S[k];
		S[k] = temp;
		keyString_16 += padding((S[(S[j] + S[k]) % 256]).toString(16),2);	
	}
	$('.text_keyStr').html(keyString_16);
}
function makeCipher(str, key){
	cipher_16 = '';
	for(var i = 0, temp; i < str.length / 2; i++){
		temp = parseInt(str.substring(2*i,2*i+2),16) ^ parseInt(key.substring(2*i,2*i+2),16);
		cipher_16 += padding(temp.toString(16),2);
	}
	$('.text_cipher').html(cipher_16);

}
function decryption(str, key){
	decryption_16 = '';
	for(var i = 0, temp; i < str.length / 2; i++){
		temp = parseInt(str.substring(2*i,2*i+2),16) ^ parseInt(key.substring(2*i,2*i+2),16);
		decryption_16 += padding(temp.toString(16),2);
	}
	$('.text_decrypt').html(hexToString(decryption_16.substring(0,str.length-8)));
}