function ani_sendChallenge(){
	var start = $('.button_start');
	var crc = $('.box_crc');
	var message = $('.img_message');
	var client = $('.img_client');

	start.css('display','none');
	crc.css('display','block');
	message.css('left',getCoord(client,'HCENTER') - message.width()/2);
	message.css('top',getCoord(client,'BOTTOM'));

	message.animate({top:getCoord(crc,'TOP')},10*speed,function(){ani_C_passCRC();});
}
function ani_C_passCRC(){
	var message = $('.img_message');
	var client = $('.img_client');
	var crc = $('.box_crc');

	message.animate({left:getCoord(crc,'HCENTER')-10},10*speed,function(){ani_C_withCRC();});
}
function ani_C_withCRC(){
	crcTable = makeCrcTable();
	makeCheckSum();

	var message = $('.img_message');
	var crc = $('.img_crc');
	var rc = $('.box_rc');

	crc.css('display', 'block');
	rc.css('display','block');
	crc.css('top', getCoord(message,'TOP'));
	crc.css('left', getCoord(message,'HCENTER') - crc.width()/2);

	crc.animate({top:getCoord($('.box_crc'),'BOTTOM')+20},15*speed);
	message.animate({top:getCoord($('.box_crc'),'BOTTOM')+25},15*speed,function(){ani_C_withIV()});
}
function ani_C_withIV(){
	var iv_2 = '';
	for(var i = 0; i < 24; i++)
		iv_2 += Math.floor(Math.random() * 2) + '';
	iv_16 = parseInt(iv_2, 2).toString(16);
	iv_16 = padding(iv_16,6);
	$('.text_iv_16').html(iv_16);
	$('.text_seed').html(iv_16 + sharedKey_16);

	var rc = $('.box_rc');
	var client = $('.img_client');
	var crc = $('.img_crc');
	var key = $('.img_key');
	var iv = $('.img_iv');
	var message = $('.img_message');

	iv.css('display','block');
	iv.css('left',getCoord(client,'HCENTER')-iv.width()/2);
	iv.css('top',getCoord(client,'VCENTER'));
	key.css('display','block');
	key.css('left',getCoord(client,'HCENTER')-key.width()/2);
	key.css('top',getCoord(client,'VCENTER')+iv.height());
	message.animate({left:getCoord(rc,'LEFT')-message.width()},25*speed);
	crc.animate({left:getCoord(rc,'LEFT')-message.width()},25*speed);
	iv.animate({top:getCoord(rc,'TOP')-key.height()-iv.height()},25*speed);
	key.animate({top:getCoord(rc,'TOP')-key.height()},25*speed,function(){ani_C_passRC()});
}
function ani_C_passRC(){
	var rc = $('.box_rc');
	var client = $('.img_client');
	var crc = $('.img_crc');
	var key = $('.img_key');
	var iv = $('.img_iv');
	var message = $('.img_message');

	message.animate({left:getCoord(rc,'LEFT')+rc.width()/2+10},15*speed);
	crc.animate({left:getCoord(rc,'LEFT')+rc.width()/2},15*speed);
	iv.animate({top:getCoord(rc,'TOP')},15*speed);
	key.animate({top:getCoord(rc,'TOP')+iv.height()},15*speed,function(){ani_C_withStr()});
}
function ani_C_withStr(){
	makeKeyString(plainText_16,iv_16 + sharedKey_16);

	var crc = $('.img_crc');
	var rc = $('.box_rc');
	var str = $('.img_str');
	var key = $('.img_key');
	var iv = $('.img_iv');
	var message = $('.img_message');

	key.css('display','none');
	iv.css('display','none');
	$('.box_xor').css('display','block');
	str.css('display','block');
	str.css('left',getCoord(rc,'LEFT'));
	str.css('top',getCoord(rc,'BOTTOM')-str.height());
	crc.css('left',getCoord(str,'RIGHT'));

	crc.animate({top:getCoord(rc,'BOTTOM')+17},15*speed);
	str.animate({left:getCoord(rc,'RIGHT')},15*speed);
	message.animate({top:getCoord(rc,'BOTTOM')+crc.height()+10},15*speed,function(){ani_C_towardXOR()});
}
function ani_C_towardXOR(){
	makeCipher(plainText_16,keyString_16);

	var message = $('.img_message');
	var rc = $('.obx_rc');
	var iv = $('.img_iv');
	var client = $('.img_client');
	var xor = $('.box_xor');
	var crc = $('.img_crc');
	var str = $('.img_str');

	xor.css('display','block');

	str.animate({left:getCoord(xor,'LEFT')},15*speed);
	crc.animate({left:getCoord(xor,'LEFT')-crc.width()},15*speed);
	message.animate({left:getCoord(xor,'LEFT')-message.width()},15*speed,function(){ani_C_passXOR()});
}
function ani_C_passXOR(){
	makeCipher(plainText_16,keyString_16);

	var message = $('.img_message');
	var rc = $('.obx_rc');
	var iv = $('.img_iv');
	var client = $('.img_client');
	var xor = $('.box_xor');
	var str = $('.img_str');
	var crc = $('.img_crc');

	xor.css('display','block');

	crc.animate({left:getCoord(xor,'LEFT')},15*speed);
	message.animate({left:getCoord(xor,'LEFT')},15*speed);
	str.animate({top:getCoord(xor,'TOP')},15*speed, function(){ani_C_encrypt();});
}
function ani_C_encrypt(){
	var iv = $('.img_iv');
	var enc = $('.img_enc'); 
	var client = $('.img_client');
	var crc = $('.img_crc');
	var str = $('.img_str');
	var xor = $('.box_xor');
	var message = $('.img_message');

	crc.css('display','none');
	str.css('display','none');
	message.css('display','none');
	iv.css('display','block');
	enc.css('display','block');
	enc.css('left',getCoord(xor,'RIGHT'));
	enc.css('top',getCoord(xor,'BOTTOM'));
	iv.css('left',getCoord(client,'RIGHT'));
	iv.css('top',getCoord(client,'VCENTER'));
	
	iv.animate({left:getCoord(xor,'RIGHT')+enc.width()/2},10*speed);
	enc.animate({left:getCoord(xor,'RIGHT')+enc.width()/2},10*speed,function(){ani_C_withEnc()});
}
function ani_C_withEnc(){
	var iv = $('.img_iv');
	var enc = $('.img_enc'); 

	iv.animate({top:getCoord(enc,'TOP')-iv.height()},8*speed,function(){ani_C_towardTarget();});
}
function ani_C_towardTarget(){
	var iv = $('.img_iv');
	var enc = $('.img_enc'); 

	iv.animate({top:getCoord(iv,'TOP')+100},10*speed);
	enc.animate({top:getCoord(enc,'TOP')+100},10*speed,function(){ani_C_towardTarget2();});
}
function ani_C_towardTarget2(){
	var iv = $('.img_iv');
	var enc = $('.img_enc'); 
	var client = $('.img_client');

	iv.animate({left:getCoord(client,'HCENTER')-iv.width()/2},10*speed);
	enc.animate({left:getCoord(client,'HCENTER')-enc.width()/2},10*speed,function(){ani_C_passTarget();});
}
function ani_C_passTarget(){
	var client = $('.img_client');
	var iv = $('.img_iv');
	var enc = $('.img_enc'); 
	var target = $('.img_target');
	var key = $('.img_key');  
	var start = $('.button_start');
	var crc = $('.box_crc');
	var xor = $('.box_xor');
	var rc = $('.box_rc');
	var message = $('.img_message');

	iv.animate({top:getCoord(target,'BOTTOM')-iv.height()-key.height()+10},8*speed);
	enc.animate({top:getCoord(target,'BOTTOM')-key.height()+10},8*speed,function(){
		stage++;
		setLocation(stage);
	
		iv.css('display','none');
		enc.css('display', 'none');
		start.val('복호화 및 연결 승인하기');
		start.css('left',getCoord(client,'HCENTER')-start.width()/2);
		start.css('display','block');
		start.attr('onclick', 'ani_A_towardRC()');
	});
}
function ani_A_towardRC(){
	var iv = $('.img_iv');
	var enc = $('.img_enc');
	var key = $('.img_key'); 
	var target = $('.img_target'); 
	var message = $('.img_message');
	var start = $('.button_start');
	var rc = $('.box_rc');

	rc.css('display','block');
	start.css('display','none');
	iv.css('display', 'block');
	enc.css('display', 'block');
	key.css('display','block');
	key.css('left',getCoord(target,'HCENTER')-key.width()/2);
	key.css('top',getCoord(target,'BOTTOM')-key.height()+10);
	iv.css('left',getCoord(target,'HCENTER')-iv.width()/2);

	iv.animate({top:getCoord(rc,'TOP')},10*speed);
	key.animate({top:getCoord(rc,'TOP')+iv.height()},10*speed,function(){ani_A_passRC();});

	
}		
function ani_A_passRC(){
	var iv = $('.img_iv');
	var key = $('.img_key'); 
	var rc = $('.box_rc');

	iv.animate({left:getCoord(rc,'LEFT')},10*speed);
	key.animate({left:getCoord(rc,'LEFT')},10*speed,function(){ani_A_withStr();});
}	
function ani_A_withStr(){
	var iv = $('.img_iv');
	var key = $('.img_key'); 
	var str = $('.img_str');
	var rc = $('.box_rc');
	var xor = $('.box_xor');
	var enc = $('.img_enc');

	iv.css('display','none');
	key.css('display','none');
	str.css('display','block');
	str.css('top',getCoord(rc,'TOP'));
	enc.css('display','block');
	xor.css('display','block');

	str.animate({top:getCoord(rc,'TOP')-rc.height()},15*speed,function(){ani_A_towardXOR();});
}
function ani_A_towardXOR(){
	var xor = $('.box_xor');
	var enc = $('.img_enc');
	var str = $('.img_str');
	
	enc.animate({top:getCoord(xor,'BOTTOM')+20},10*speed);
	str.animate({left:getCoord(xor,'RIGHT')+20},10*speed,function(){ani_A_passXOR();});
}
function ani_A_passXOR(){
	var enc = $('.img_enc');
	var str = $('.img_str');
	var xor = $('.box_xor');

	enc.animate({top:getCoord(xor,'BOTTOM')},15*speed);
	str.animate({left:getCoord(xor,'RIGHT')-str.width()+10},15*speed,function(){ani_A_withCRC();});
}
function ani_A_withCRC(){
	decryption(cipher_16,keyString_16);

	var enc = $('.img_enc');
	var str = $('.img_str');
	var xor = $('.box_xor');
	var crc = $('.img_crc');
	var message = $('.img_message');

	enc.css('display','none');
	str.css('display','none');
	$('.box_crc').css('display','block');
	crc.css('display','block');
	crc.css('left',getCoord(xor,'HCENTER')+10);
	crc.css('top',getCoord(xor,'VCENTER'));
	message.css('display','block');
	message.css('left',getCoord(xor,'LEFT'));
	message.css('top',getCoord(xor,'VCENTER'));

	message.animate({top:getCoord(message,'TOP')+message.height()-20},15*speed);
	crc.animate({top:getCoord(crc,'TOP')+crc.height()+20},15*speed,function(){ani_A_towardCRC();});
	
}
function ani_A_towardCRC(){
	var crc = $('.img_crc');
	var target = $('.img_target');
	var message = $('.img_message');

	crc.animate({top:getCoord(target,'BOTTOM')-crc.height()},10*speed);
	message.animate({left:getCoord($('.box_crc'),'HCENTER')-message.width()/2+10},10*speed,function(){ani_A_passCRC();});
	
}
function ani_A_passCRC(){
	var crc = $('.img_crc');
	var message = $('.img_message');

	crc.css('display','none');

	message.animate({top:getCoord($('.box_crc'),'TOP')},10*speed,function(){ani_A_towardTarget();});
	
}
function ani_A_towardTarget(){
	var crc = $('.img_crc');
	var target = $('.img_target');
	var message = $('.img_message');

	message.css('display','none');
	crc.css('display','block');

	crc.css('left',getCoord($('.box_crc'),'HCENTER')-crc.width()/2+10);
	crc.css('top',getCoord($('.box_crc'),'BOTTOM')+20);

	crc.animate({top:getCoord(target,'BOTTOM')-crc.height()},10*speed,function(){ani_A_towardTarget2();});
}
function ani_A_towardTarget2(){
	var crc = $('.img_crc');
	var target = $('.img_target');
	var start = $('.button_start');
	var xor = $('.box_xor');
	var rc = $('.box_rc');
	var client = $('.img_client');

	crc.animate({left:getCoord(target,'LEFT')},10*speed,function(){ani_A_passTarget();});
}
function ani_A_passTarget(){
	$('.text_checkSum').html('OK!');
	
	var ok = $('.img_ok');
	var crc = $('.img_crc');
	var client = $('.img_client');
	var target = $('.img_target');
	var start = $('.button_start');
	var xor = $('.box_xor');
	var rc = $('.box_rc');

	rc.css('display','none');
	crc.css('display','none');
	xor.css('display','none');
	$('.box_crc').css('display','none');
	ok.css('display','block');
	ok.css('top',getCoord(target,'BOTTOM')-ok.height());
	ok.animate({top:getCoord(client,'TOP')},25*speed,function(){
		ok.css('display','none');
		start.css('display','block');
		start.val('다시 시작');
		start.css('left',getCoord(client,'HCENTER')-start.width()/2);
		start.attr('onclick', 'window.location.reload()');
	});
}